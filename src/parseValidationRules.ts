import {Configs, TValidation, ValidationRuleParser} from "./types"
import Validation from "./Validation"

const parseValidationRules = <T>(validationRules: TValidation<T>, configs: Configs<T>) => {
    return Object.entries(validationRules).reduce((acc, [fieldName, rules]) => {
        if(rules instanceof Validation){
            acc[fieldName] = rules
            return acc
        }
        acc[fieldName] = rules.split('|').reduce((acc, val) => {
            const parts = val.split(':')
            if (parts[0] === 'bail') {
                configs.stopOnError[fieldName] = true
                return acc
            }
            if (parts[0] === 'omitEmpty') {
                configs.omitEmpty[fieldName] = true
                return acc
            }
            acc[parts[0]] = parts[1]
            return acc
        }, {})
        return acc
    }, {} as ReturnType<ValidationRuleParser<T>>)
}

export default parseValidationRules