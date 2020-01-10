import {
    TOverrides,
    TResultListener,
    TResults,
    TValidation,
    TValidators
} from './types'
import Required               from './rules/Required'
import Email                  from './rules/Email'
import IncludeCapitalLetter   from './rules/IncludeCapitalLetter'
import IncludeLowercaseLetter from './rules/IncludeLowercaseLetter'
import IncludeNumber          from './rules/IncludeNumber'
import IncludeSpecialChar     from './rules/IncludeSpecialChar'
import Length                 from './rules/Length'
import Min                    from './rules/Min'
import Max                    from './rules/Max'
import OnlyString             from './rules/OnlyString'
import OnlyInteger            from './rules/OnlyInteger'
import {string}               from './utils'
import Match                  from './rules/Match'


const defaultRules = {
    required              : {validator: Required, errMsg: 'must.not.be.empty'},
    email                 : {validator: Email, errMsg: 'must.be.email'},
    match                 : {validator: Match, errMsg: 'must.match'},
    includeCapitalLetter  : {validator: IncludeCapitalLetter, errMsg: 'must.contain.cap.letter'},
    includeLowercaseLetter: {validator: IncludeLowercaseLetter, errMsg: 'must.contain.low.letter'},
    includeNumber         : {validator: IncludeNumber, errMsg: 'must.contain.number'},
    includeSpecialChar    : {validator: IncludeSpecialChar, errMsg: 'must.contain.special.char'},
    length                : {validator: Length, errMsg: 'must.be.between'},
    min                   : {validator: Min, errMsg: 'must.be.min'},
    max                   : {validator: Max, errMsg: 'must.be.max'},
    string                : {validator: OnlyString, errMsg: 'must.be.only.string'},
    int                   : {validator: OnlyInteger, errMsg: 'must.be.only.number'},
}

class Validation<T> {

    results: TResults<T>
    listeners: TResultListener<TResults<T>>[] = []
    validation: Record<keyof T, string>
    validators: TValidators = defaultRules
    configs: TOverrides = {}

    addValidators(validators: TValidators) {
        Object.keys(validators).forEach(validatorName => {
            this.validators[validatorName] = {
                validator: validators[validatorName].validator,
                errMsg   : validators[validatorName].errMsg
            }
        })
        return this
    }

    overrides(configs: TOverrides) {
        this.configs = configs
        return this
    }

    setRules(validation: Record<keyof T, string>) {
        this.validation = validation
        return this
    }

    addOnResultListener(listener: TResultListener<TResults<T>>) {
        this.listeners.push(listener)
        return this
    }

    private parseValidationRules(validationRules: TValidation) {
        this.configs.stopOnError = {}
        const stopOnError = this.configs.stopOnError
        return Object.entries(validationRules).reduce((acc, [fieldName, rulesString]) => {
            acc[fieldName] = rulesString.split('|').reduce((acc, val) => {
                let parts = val.split(':')
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

    validate(data: T) {

        const parsedValidationRules = this.parseValidationRules(this.validation)
        const stop = this.configs.stopOnError
        const messages = this.configs.messages

        this.results = ({} as TResults<T>)

        const allPromises = Object.entries(data).map(async ([name, value]) => {

            this.results[name] = []

            for (const validatorName of Object.keys(parsedValidationRules[name])) {

                if (string.isFalsy(validatorName)) {
                    return
                }

                if (!this.validators[validatorName]) {
                    throw new RangeError(`Please provide existing validator name for ${name}`)
                }

                const {validator, errMsg} = this.validators[validatorName]
                const {isValid, additionalData} = await new validator(parsedValidationRules[name][validatorName], data).validate(value)
                if (!isValid) {
                    this.results[name].push({
                        errMsg        : messages && messages[validatorName] ? messages[validatorName] : errMsg,
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

        Promise
            .all(allPromises)
            .then(() => this.listeners.forEach(func => {
                func(this.results)
            }))
    }
}

export default Validation