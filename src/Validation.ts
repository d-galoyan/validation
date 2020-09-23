import {
  GlobalValidator,
  ShouldValidateFields,
  TOverrides,
  TResultListener,
  TResults,
  TValidation,
  TValidators
} from './types'
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

const defaultValidators = {
  required               : {validator: new Required(), errMsg: 'must.not.be.empty'},
  email                  : {validator: new Email(), errMsg: 'must.be.email'},
  match                  : {validator: new Match(), errMsg: 'must.match'},
  includeCapitalLetter   : {validator: new IncludeCapitalLetter(), errMsg: 'must.contain.cap.letter'},
  includeLowercaseLetter : {validator: new IncludeLowercaseLetter(), errMsg: 'must.contain.low.letter'},
  includeNumber          : {validator: new IncludeNumber(), errMsg: 'must.contain.number'},
  includeSpecialChar     : {validator: new IncludeSpecialChar(), errMsg: 'must.contain.special.char'},
  length                 : {validator: new Length(), errMsg: 'must.be.between'},
  min                    : {validator: new Min(), errMsg: 'must.be.min'},
  max                    : {validator: new Max(), errMsg: 'must.be.max'},
  string                 : {validator: new OnlyString(), errMsg: 'must.be.only.string'},
  int                    : {validator: new OnlyInteger(), errMsg: 'must.be.only.number'},
}


export const addValidators = (validators: GlobalValidator[]) => {
  validators.forEach(validator => {
    defaultValidators[validator.name] = {
      validator : validator.validator,
      errMsg    : validator.errMsg
    }
  })
}

class Validation<T> {

  results: TResults<T>
  listener: TResultListener<TResults<T>>
  validation: Record<keyof T, string>
  validators: TValidators = {...defaultValidators}
  shouldValidateFields: ShouldValidateFields<T> = {}
  configs: TOverrides = {
    stopOnError : {},
    omitEmpty   : {}
  }

  addValidators(validators: TValidators) {
    Object.keys(validators).forEach(validatorName => {
      this.validators[validatorName] = {
        validator : validators[validatorName].validator,
        errMsg    : validators[validatorName].errMsg
      }
    })
    return this
  }

  setShouldValidate(shouldValidateFields: ShouldValidateFields<T>){
    this.shouldValidateFields = shouldValidateFields
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

      if(this.shouldValidateFields[name] && !this.shouldValidateFields[name].shouldValidate(data)){
        return
      }

      for (const validatorName of Object.keys(parsedValidationRules[name])) {


        if (string.isFalsy(validatorName) || (this.configs.omitEmpty[name] && !value)) {
          return
        }

        if (!this.validators[validatorName]) {
          throw new RangeError(`
            Please provide existing validator name for ${name}.
            ${validatorName} doesn't exists!
          `)
        }

        const {validator, errMsg} = this.validators[validatorName]
        const {isValid, additionalData} = await validator.validate(value, parsedValidationRules[name][validatorName], data)
        if (!isValid) {
          this.results[name].push({
            errMsg         : messages && messages[validatorName] ? messages[validatorName] : errMsg,
            additionalData : {
              ...additionalData
            }
          })
          if (stop[name]) {
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
    return Object.entries(validationRules).reduce((acc, [fieldName, rulesString]) => {
      acc[fieldName] = rulesString.split('|').reduce((acc, val) => {
        const parts = val.split(':')
        if (parts[0] === 'bail') {
          this.configs.stopOnError[fieldName] = true
          return acc
        }
        if (parts[0] === 'omitEmpty') {
          this.configs.omitEmpty[fieldName] = true
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