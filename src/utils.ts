import {Configs, Errors, GlobalValidator, ParsedValidationRules} from "./types"

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

    if(errors[fieldName].length === 0){
        return false
    }

    for(const err of errors[fieldName]){

        if(!Array.isArray(err)){
            return true
        }

        if(Array.isArray(err) && err.length > 0){
            return true
        }
    }

    return false
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

export  const shouldNotValidate = async <T>(name : string, value : T[keyof T], configs : Configs<T>, allCtxData : T) => {
    return (
        configs.shouldValidateFields[name] && !(await configs.shouldValidateFields[name].shouldValidate(allCtxData))
        ) || (configs.omitEmpty[name] && !value)
}

export const handleValidation  = async <T>(
    validatorName : string,
    validators :  GlobalValidator[],
    name : string,
    value : T[keyof T],
    parsedValidationRules : ParsedValidationRules<T>,
    allCtxData : T,
    errors :  Errors<T>,
    configs : Configs<T>,
    index ?: number
) => {

    if (string.isFalsy(validatorName)) {
        return false
    }

    const validatorObj = validators.find(v => v.name === validatorName)

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
        if(index !== undefined){
            errors[name][index].push({ errMsg, additionalData })
        } else {
            errors[name].push({ errMsg, additionalData })
        }

        if (configs.stopOnError[name]) {
            return true
        }
    }
    return false
}

