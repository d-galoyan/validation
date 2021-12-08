import Validator from './validators/Validator'
import Validation from "./Validation"

export type Configs<T> = {
    stopOnError: Partial<Record<keyof T, boolean>>,
    omitEmpty: Partial<Record<keyof T, boolean>>,
    shouldValidateFields: Partial<ShouldValidateFields<T>>,
}

export type TError<A = string | number> = {
    errMsg: string,
    additionalData?: Record<string, A>,
}

export type Errors<T> = {
    [key in keyof T]: TError[] | Errors<T[keyof T]>
}

export type TResultListener<T> = (result: T) => void

export type TValidation<T> = Record<string, string | Validation<T[keyof T]>>

export type GlobalValidator = {
    name: string,
    validator: Validator,
    errMsg: string,
}

export type ShouldValidate<T> = {
    shouldValidate: (allData: T) => boolean | Promise<boolean>,
}

export type ShouldValidateFields<T> = Partial<Record<keyof T, ShouldValidate<T>>>

export type ParsedValidationRules<T> =  Record<keyof T, string | Validation<T[keyof T]>>

export type ValidationRuleParser<T, R = string | Validation<T[keyof T]>> = (rules: Record<keyof T, R>, configs: Configs<T>) => ParsedValidationRules<T>
