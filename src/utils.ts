import {Errors, GlobalValidator} from "./types"

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

export const hasErrors = <T>(errors: Errors<T>) : boolean => Object.keys(errors).some(fieldName => {
    if(object.isObject(errors[fieldName])){
        return hasErrors(errors[fieldName])
    }
    return errors[fieldName].length > 0
})

export const object = {
    copy<T>(obj: T) : T {
        return JSON.parse(JSON.stringify(obj))
    },
    cloneInstance<T>(instance : T) : T {
        return Object.assign(
            Object.create(
                // Set the prototype of the new object to the prototype of the instance.
                // Used to allow new object behave like class instance.
                Object.getPrototypeOf(instance),
            ),
            // Prevent shallow copies of nested structures like arrays, etc
            object.copy(instance)
        )
    },
    isObject<T>(obj : T){
       return Object.prototype.toString.call(obj) === "[object Object]"
    }
}

export const cloneValidators = (validators : GlobalValidator[]) : GlobalValidator[] => {
    return validators.reduce((clone, v ) => {
        const {name, errMsg, validator} = v
        clone.push({
            name,
            validator: object.cloneInstance(validator),
            errMsg
        })
        return clone
    }, [] as GlobalValidator[])
}

export const getNestedValue = <T>(path : string, allData : T) : T[keyof T] => {
    return path.split(".").reduce((acc, field) => {
        if(object.isObject(acc[field])){
            acc = acc[field]
        }else {
            return acc[field]
        }
        return acc
    }, allData)
}

