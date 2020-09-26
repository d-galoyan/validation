import {
  Configs,
  TResultListener,
  Results,
  Validators
} from './types'
import {hasErrors, string} from './utils'
import defaultValidators from "./validators"
import parseValidationRules from "./parseValidationRules"

class Validation<T> {

  results: Results<T> = {} as Results<T>
  listener: TResultListener<Results<T>> = () => {}
  validation: Record<keyof T, string>
  validators: Validators = {...defaultValidators}
  configs: Configs<T> = {
    stopOnError          : {},
    omitEmpty            : {},
    messages             : {},
    shouldValidateFields : {}
  }

  addValidators(validators: Validators) {
    Object.keys(validators).forEach(validatorName => {
      this.validators[validatorName] = {
        validator : validators[validatorName].validator,
        errMsg    : validators[validatorName].errMsg
      }
    })
    return this
  }

  shouldValidate(shouldValidateFields: Configs<T>["shouldValidateFields"]){
    this.configs.shouldValidateFields = shouldValidateFields
    return this
  }

  messages(messages: Configs<T>["messages"]){
    this.configs.messages = messages
    return this
  }

  rules(validation: Record<keyof T, string>) {
    this.validation = validation
    return this
  }

  onResultListener(listener: TResultListener<Results<T>>) {
    this.listener = listener
    return this
  }

  validate(data: T) {

    const parsedValidationRules = parseValidationRules(this.validation, this.configs)
    const allPromises = Object.keys(parsedValidationRules).map(async (name) => {
      const value = data[name]
      this.results[name] = []

      if(
          (this.configs.shouldValidateFields[name] && !(await this.configs.shouldValidateFields[name].shouldValidate(data)))
          || (this.configs.omitEmpty[name] && !value)
      ){
        return
      }

      for (const validatorName of Object.keys(parsedValidationRules[name])) {

        if (string.isFalsy(validatorName)) {
          return
        }

        if (!this.validators[validatorName]) {
          throw new RangeError(`
          Please provide existing validator name for ${name}. ${validatorName} doesn't exists!
          `)
        }

        const {validator, errMsg} = this.validators[validatorName]
        const {isValid, additionalData} = await validator.validate(value, parsedValidationRules[name][validatorName], data)
        if (!isValid) {
          const messages = this.configs.messages
          this.results[name].push({
            errMsg         : messages[validatorName] ? messages[validatorName] : errMsg,
            additionalData : {
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
        .then(() => this.listener(this.results))
        .then(() => new Promise<Results<T>>((resolve, reject) => {

          if (hasErrors(this.results)) {
            return reject(this.results)
          }
          return resolve(this.results)
        }))
  }
}

export default Validation