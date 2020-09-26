import {Configs, TValidation} from "./types"

const parseValidationRules = <T>(validationRules: TValidation, configs: Configs<T>) => {
    return Object.entries(validationRules).reduce((acc, [fieldName, rulesString]) => {
        acc[fieldName] = rulesString.split('|').reduce((acc, val) => {
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
    }, {})
}

export default parseValidationRules