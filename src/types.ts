import Validator from './validators/Validator'
import Validation from "./Validation"

export type Configs<T> = {
    stopOnError: Partial<{ [key in keyof T]: boolean }>,
    omitEmpty: Partial<{ [key in keyof T]: boolean }>,
    shouldValidateFields: Partial<ShouldValidateFields<T>>,
}

export type TError = {
    errMsg: string,
    additionalData?: {
        [key: string]: string | number,
    },
}


export type Errors<T> = {
    [key in Extract<keyof T, string>]: TError[] | Errors<T[keyof T]>
}


export type TResultListener<T> = (result: T) => void

export type TValidation<T> = {
    [key: string]: string | Validation<T[keyof T]>,
}

export type Validators = {
    [key: string]: {
        validator: Validator,
        errMsg: string,
    },
}

export type GlobalValidator = {
    name: string,
    validator: Validator,
    errMsg: string,
}

export type ShouldValidate<T> = {
    shouldValidate: (allData: T) => boolean,
}

export type ShouldValidateFields<T> = Partial<Record<keyof T, ShouldValidate<T>>>