import Validator from './rules/Validator'

export type TOverrides = {
    stopOnError?: { [key: string]: boolean },
    messages?: {
        [key: string]: string,
    },
}

export type TResult = {
    errMsg: string,
    additionalData?: {
        [key: string]: string | number,
    },
}

export type TResultListener<T> = (result: T) => void

export type TValidation = {
    [key: string]: string,
}

export type TValidators = {
    [key: string]: {
        validator: Validator,
        errMsg: string,
    },
}

export type TResults<T> = {
    [key in Extract<keyof T, string>]: TResult[]
}