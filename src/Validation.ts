import {
  Configs,
  TResultListener,
  Errors,
  Validators
} from './types'
import {cloneValidators, hasErrors, string} from './utils'
import defaultValidators from "./validators"
import parseValidationRules from "./parseValidationRules"

class Validation<T> {

  private readonly errors: Errors<T> = {} as Errors<T>
  private listener: TResultListener<Errors<T>> = () => {}
  private validationRules: Record<keyof T, string |  Validation<T[keyof T]>>
  private readonly validators: Validators = cloneValidators(defaultValidators)
  private readonly configs: Configs<T> = {
    stopOnError          : {},
    omitEmpty            : {},
    shouldValidateFields : {}
  }
  private data : T

  addValidators(validators: Validators) : Validation<T> {
    Object.keys(validators).forEach(validatorName => {
      this.validators[validatorName] = {
        validator : validators[validatorName].validator,
        errMsg    : validators[validatorName].errMsg
      }
    })
    return this
  }

  shouldValidate(shouldValidateFields: Configs<T>["shouldValidateFields"]) : Validation<T> {
    this.configs.shouldValidateFields = shouldValidateFields
    return this
  }

  messages(messages: {[key in keyof Validators] : string}) : Validation<T> {
    Object.keys(messages).forEach(validatorName => {
      this.validators[validatorName].errMsg = messages[validatorName]
    })
    return this
  }

  rules(validation: Record<keyof T, string | Validation<T[keyof T]>>) : Validation<T> {
    this.validationRules = validation
    return this
  }

  onResultListener(listener: TResultListener<Errors<T>>) : Validation<T> {
    this.listener = listener
    return this
  }

  validate(data: T, allData ?: T) : Promise<Errors<T>> {
    this.data = allData ? allData : data

    const parsedValidationRules = parseValidationRules(this.validationRules, this.configs)
    const allPromises = Object.keys(parsedValidationRules).map(async (name) => {
      const value = data[name]
      this.errors[name] = []

      if(
          (this.configs.shouldValidateFields[name] && !(await this.configs.shouldValidateFields[name].shouldValidate(data)))
          || (this.configs.omitEmpty[name] && !value)
      ){
        return
      }

      for (const validatorName of Object.keys(parsedValidationRules[name])) {
        if(parsedValidationRules[name] instanceof Validation){
          await parsedValidationRules[name].validate(value, this.data).catch((err : Errors<T>) => {
            this.errors[name] = err
          })
          break
        }

        if (string.isFalsy(validatorName)) {
          return
        }

        if (!this.validators[validatorName]) {
          throw new RangeError(`
          Please provide existing validator name for ${name}. ${validatorName} doesn't exists!
          `)
        }

        const {validator, errMsg : defaultErrMsg} = this.validators[validatorName]
        const {isValid, errMsg = defaultErrMsg, additionalData } = await validator.validate(value, parsedValidationRules[name][validatorName], this.data)
        if (!isValid) {
          this.errors[name].push({
            errMsg,
            additionalData: {
              ...additionalData
            }
          })
          if (this.configs.stopOnError[name]) {
            return
          }
        }
      }
    })

    return Promise
        .all(allPromises)
        .then(() => this.listener(this.errors))
        .then(() => new Promise<Errors<T>>((resolve, reject) => {

          if (hasErrors(this.errors)) {
            return reject(this.errors)
          }
          return resolve(this.errors)
        }))
  }
}

export default Validation