import {TOverrides, TResultListener, TResults, TValidation, TValidators} from './types'
import Required from './rules/Required'
import Email from './rules/Email'
import IncludeCapitalLetter from './rules/IncludeCapitalLetter'
import IncludeLowercaseLetter from './rules/IncludeLowercaseLetter'
import IncludeNumber from './rules/IncludeNumber'
import IncludeSpecialChar from './rules/IncludeSpecialChar'
import Length from './rules/Length'
import Min from './rules/Min'
import Max from './rules/Max'
import OnlyString from './rules/OnlyString'
import OnlyInteger from './rules/OnlyInteger'
import {string} from './utils'
import Match from './rules/Match'

const defaultRules = {
  required: {validator: new Required(), errMsg: 'must.not.be.empty'},
  email: {validator: new Email(), errMsg: 'must.be.email'},
  match: {validator: new Match(), errMsg: 'must.match'},
  includeCapitalLetter: {validator: new IncludeCapitalLetter(), errMsg: 'must.contain.cap.letter'},
  includeLowercaseLetter: {validator: new IncludeLowercaseLetter(), errMsg: 'must.contain.low.letter'},
  includeNumber: {validator: new IncludeNumber(), errMsg: 'must.contain.number'},
  includeSpecialChar: {validator: new IncludeSpecialChar(), errMsg: 'must.contain.special.char'},
  length: {validator: new Length(), errMsg: 'must.be.between'},
  min: {validator: new Min(), errMsg: 'must.be.min'},
  max: {validator: new Max(), errMsg: 'must.be.max'},
  string: {validator: new OnlyString(), errMsg: 'must.be.only.string'},
  int: {validator: new OnlyInteger(), errMsg: 'must.be.only.number'},
}

const shouldContinue = (parsedValidationRules: any, data: any, value: any, name: string) => {

  const hasRequired = parsedValidationRules[name].hasOwnProperty("required")

  if (!hasRequired && string.isFalsy(value)) {
    return false
  }

  if (parsedValidationRules[name].required !== undefined) {
    const reqValue = parsedValidationRules[name].required
    const parts = reqValue.split("(")

    if (parts.length === 1) {
      return data[parts[0]]
    }

    if (parts.length === 2) {
      const regExp = /\(([^)]+)\)/;
      const value = regExp.exec(reqValue) || []
      return data[parts[0]] === value[1]
    }
  }

  return true
}

class Validation<T> {

  results: TResults<T>
  listener: TResultListener<TResults<T>>
  validation: Record<keyof T, string>
  validators: TValidators = {...defaultRules}
  configs: TOverrides = {}

  addValidators(validators: TValidators) {
    Object.keys(validators).forEach(validatorName => {
      this.validators[validatorName] = {
        validator: validators[validatorName].validator,
        errMsg: validators[validatorName].errMsg
      }
    })
    return this
  }

  overrides(configs: TOverrides) {
    this.configs = configs
    return this
  }

  rules(validation: Record<keyof T, string>) {
    this.validation = validation
    return this
  }

  onResultListener(listener: TResultListener<TResults<T>>) {
    this.listener = listener
    return this
  }

  validate(data: T) {

    const parsedValidationRules = this.parseValidationRules(this.validation)
    const stop = this.configs.stopOnError
    const messages = this.configs.messages

    this.results = ({} as TResults<T>)

    const allPromises = Object.keys(parsedValidationRules).map(async (name) => {
      const value = data[name]
      this.results[name] = []

      if (!shouldContinue(parsedValidationRules, data, value, name)) {
        return
      }

      for (const validatorName of Object.keys(parsedValidationRules[name])) {


        if (string.isFalsy(validatorName)) {
          return
        }

        if (!this.validators[validatorName]) {
          throw new RangeError(`Please provide existing validator name for ${name}`)
        }

        const {validator, errMsg} = this.validators[validatorName]
        const {isValid, additionalData} = await validator.validate(value, parsedValidationRules[name][validatorName], data)
        if (!isValid) {
          this.results[name].push({
            errMsg: messages && messages[validatorName] ? messages[validatorName] : errMsg,
            additionalData: {
              ...additionalData
            }
          })
          if (stop && stop[name]) {
            return
          }
        }
      }
    })

    return Promise
        .all(allPromises)
        .then(() => this.listener && this.listener(this.results))
        .then(() => new Promise<TResults<T>>((resolve, reject) => {

          const hasErrors = Object.keys(this.results).some(fieldName => this.results[fieldName].length > 0)

          if (hasErrors) {
            return reject(this.results)
          }
          return resolve(this.results)
        }))
  }

  private parseValidationRules(validationRules: TValidation) {
    this.configs.stopOnError = {}
    const stopOnError = this.configs.stopOnError
    return Object.entries(validationRules).reduce((acc, [fieldName, rulesString]) => {
      acc[fieldName] = rulesString.split('|').reduce((acc, val) => {
        const parts = val.split(':')
        if (parts[0] === 'bail') {
          stopOnError[fieldName] = true
          return acc
        }
        acc[parts[0]] = parts[1]
        return acc
      }, {})
      return acc
    }, {})
  }
}

export default Validation