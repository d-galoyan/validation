import {
  Configs,
  TResultListener,
  Errors,
  ValidationRuleParser,
  GlobalValidator
} from './types'
import {cloneValidators, hasErrors, string} from './utils'
import defaultValidators from "./validators"
import parseValidationRules from "./parseValidationRules"

class Validation<T> {

  private readonly listeners: TResultListener<Errors<T>>[] = []
  private validationRules: Record<keyof T, string |  Validation<T[keyof T]>>
  private validators: GlobalValidator[] = cloneValidators(defaultValidators)
  private readonly configs: Configs<T> = {
    stopOnError          : {},
    omitEmpty            : {},
    shouldValidateFields : {}
  }

  constructor(private readonly validationRuleParser : ValidationRuleParser<T> = parseValidationRules) {
    this.addValidators = this.addValidators.bind(this)
    this.shouldValidate = this.shouldValidate.bind(this)
    this.messages = this.messages.bind(this)
    this.rules = this.rules.bind(this)
    this.addResultListener = this.addResultListener.bind(this)
    this.validate = this.validate.bind(this)
    this.validationRuleParser = this.validationRuleParser.bind(this)
  }

  addValidators(validators: GlobalValidator[]) : Validation<T> {
    const filteredValidators = this.validators.filter(v => !validators.find(val => val.name === v.name))
    validators.forEach(v => {
      const  {name, validator, errMsg} = v
      filteredValidators.push({
        name,validator, errMsg
      })
    })
    this.validators = filteredValidators
    return this
  }

  shouldValidate(shouldValidateFields: Configs<T>["shouldValidateFields"]) : Validation<T> {
    this.configs.shouldValidateFields = shouldValidateFields
    return this
  }

  messages(messages: Record<string, string>) : Validation<T> {
    Object.keys(messages).forEach(validatorName => {
      const validator = this.validators.find(v => v.name === validatorName)
      if(validator){
        validator.errMsg = messages[validatorName]
      }
    })
    return this
  }

  rules(validation: Record<keyof T, string | Validation<T[keyof T]>>) : Validation<T> {
    this.validationRules = validation
    return this
  }

  addResultListener(listener: TResultListener<Errors<T>>) : Validation<T> {
    this.listeners.push(listener)
    return this
  }

  validate(data: T, contextData ?: T) : Promise<Errors<T>> {

    const allCtxData = contextData ? contextData : data
    const errors = {} as Errors<T>
    const parsedValidationRules = this.validationRuleParser(this.validationRules, this.configs)
    const allPromises = Object.keys(parsedValidationRules).map(async (name) => {
      const value = data[name]

      errors[name] = []

      if(
          (this.configs.shouldValidateFields[name] && !(await this.configs.shouldValidateFields[name].shouldValidate(allCtxData)))
          || (this.configs.omitEmpty[name] && !value)
      ){
        return
      }

      for (const validatorName of Object.keys(parsedValidationRules[name])) {
        if(parsedValidationRules[name] instanceof Validation){
          await parsedValidationRules[name].validate(value, allCtxData).catch((err : Errors<T>) => {
            errors[name] = err
          })
          break
        }

        if (string.isFalsy(validatorName)) {
          return
        }

        const validatorObj = this.validators.find(v => v.name === validatorName)

        if (!validatorObj) {
          throw new RangeError(`Please provide existing validator name for ${name}. ${validatorName} doesn't exists!`)
        }

        const {validator, errMsg : defaultErrMsg} = validatorObj
        const {
          isValid,
          errMsg = defaultErrMsg,
          additionalData = {}
        } = await validator.validate(value, parsedValidationRules[name][validatorName], allCtxData)

        if (!isValid) {
          errors[name].push({ errMsg, additionalData })
          if (this.configs.stopOnError[name]) {
            return
          }
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
