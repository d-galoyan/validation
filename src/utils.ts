import {Results, Validators} from "./types"

export const string = {
    isFalsy(str: string | null | undefined): boolean {
        return !str
            || str === ''
            || str === undefined
            || typeof str === undefined
            || str === null
            || str === 'undefined'
    }
}

export const hasErrors = <T>(results: Results<T>) => Object.keys(results).some(fieldName => results[fieldName].length > 0)

export const object = {
    copy(obj: Record<string, any>) {
        return JSON.parse(JSON.stringify(obj))
    },
    cloneInstance<T>(instance : T){
        return Object.assign(
            Object.create(
                // Set the prototype of the new object to the prototype of the instance.
                // Used to allow new object behave like class instance.
                Object.getPrototypeOf(instance),
            ),
            // Prevent shallow copies of nested structures like arrays, etc
            object.copy(instance)
        )
    }
}

export const cloneValidators = (validators : Validators) : Validators => {
    return Object.keys(validators).reduce((clone, validatorName ) => {
        clone[validatorName] = {}
        clone[validatorName].validator = object.cloneInstance(validators[validatorName].validator)
        clone[validatorName].errMsg = validators[validatorName].errMsg
        return clone
    }, {})
}

export const getNestedValue = (path : string, allData : Record<string, any>) => {
    return path.split(".").reduce((acc, field) => {
        if(acc[field] instanceof Object){
            acc = acc[field]
        }else {
            return acc[field]
        }
        return acc
    }, allData)
}

