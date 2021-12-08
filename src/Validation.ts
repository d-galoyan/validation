import {
    Configs,
    TResultListener,
    Errors,
    ValidationRuleParser,
    GlobalValidator,
} from './types'
import {cloneValidators, handleValidation, hasErrors, shouldNotValidate} from './utils'
import defaultValidators from "./validators"
import parseValidationRules from "./parseValidationRules"

class Validation<T> {

    private readonly listeners: TResultListener<Errors<T>>[] = []
    private validationRules: Record<keyof T, string | Validation<T[keyof T]>>
    private validators: GlobalValidator[] = cloneValidators(defaultValidators)
    private readonly configs: Configs<T> = {
        stopOnError          : {},
        omitEmpty            : {},
        shouldValidateFields : {}
    }

    constructor(private readonly validationRuleParser: ValidationRuleParser<T> = parseValidationRules) {
        this.addValidators = this.addValidators.bind(this)
        this.shouldValidate = this.shouldValidate.bind(this)
        this.messages = this.messages.bind(this)
        this.rules = this.rules.bind(this)
        this.addResultListener = this.addResultListener.bind(this)
        this.validate = this.validate.bind(this)
        this.validationRuleParser = this.validationRuleParser.bind(this)
    }

    addValidators(validators: GlobalValidator[]): Validation<T> {
        const filteredValidators = this.validators.filter(v => !validators.find(val => val.name === v.name))
        validators.forEach(v => {
            const {name, validator, errMsg} = v
            filteredValidators.push({
                name, validator, errMsg
            })
        })
        this.validators = filteredValidators
        return this
    }

    shouldValidate(shouldValidateFields: Configs<T>["shouldValidateFields"]): Validation<T> {
        this.configs.shouldValidateFields = shouldValidateFields
        return this
    }

    messages(messages: Record<string, string>): Validation<T> {
        Object.keys(messages).forEach(validatorName => {
            const validator = this.validators.find(v => v.name === validatorName)
            if (validator) {
                validator.errMsg = messages[validatorName]
            }
        })
        return this
    }

    rules(validation: Record<keyof T, string | Validation<T[keyof T]>>): Validation<T> {
        this.validationRules = validation
        return this
    }

    addResultListener(listener: TResultListener<Errors<T>>): Validation<T> {
        this.listeners.push(listener)
        return this
    }

    validate(data: T, contextData ?: T): Promise<Errors<T>> {

        const allCtxData = contextData ? contextData : data
        const errors = {} as Errors<T>
        const parsedValidationRules = this.validationRuleParser(this.validationRules, this.configs)
        const allPromises = Object.keys(parsedValidationRules).map(async (name) => {
            const value = data[name]

            errors[name] = []

            if (Array.isArray(value)) {
                for (const [i, v] of value.entries()) {
                    errors[name][i] = []

                    if (await shouldNotValidate(name, v, this.configs, allCtxData)) {
                        return
                    }

                    for (const validatorName of Object.keys(parsedValidationRules[name])) {

                      const stop = await handleValidation(
                          validatorName,
                          this.validators,
                          name,
                          v,
                          parsedValidationRules,
                          allCtxData,
                          errors,
                          this.configs,
                          i
                      )

                      if (stop) {
                        break
                      }
                    }
                }
                return
            }

            if (await shouldNotValidate(name, value, this.configs, allCtxData)) {
                return
            }

            for (const validatorName of Object.keys(parsedValidationRules[name])) {
                if (parsedValidationRules[name] instanceof Validation) {
                    await parsedValidationRules[name].validate(value, allCtxData).catch((err: Errors<T>) => {
                        errors[name] = err
                    })
                    break
                }

                const stop = await handleValidation(
                    validatorName,
                    this.validators,
                    name,
                    value,
                    parsedValidationRules,
                    allCtxData,
                    errors,
                    this.configs
                )

                if (stop) {
                    return
                }
            }
        })

        return Promise
            .all(allPromises)
            .then(() => this.listeners.forEach(listener => listener(errors)))
            .then(() => new Promise<Errors<T>>((resolve, reject) => {

                if (hasErrors(errors)) {
                    return reject(errors)
                }
                return resolve(errors)
            }))
    }
}

export default Validation
