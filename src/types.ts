import Validator from './validators/Validator'
import Validation from "./Validation";

export type Configs<T> = {
    stopOnError: Partial<{ [key in keyof T]: boolean }>,
    omitEmpty: Partial<{ [key in keyof T]: boolean }>,
    messages: Partial<{ [key in keyof T]: string }>,
    shouldValidateFields: Partial<ShouldValidateFields<T>>,
}

export type TResult = {
    errMsg: string,
    additionalData?: {
        [key: string]: string | number,
    },
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

export type Results<T> = {
    [key in Extract<keyof T, string>]: TResult[]
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