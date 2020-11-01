type ValidateT<A = string | number> = {
    readonly isValid: boolean,
    readonly errMsg ?: string,
    readonly additionalData?: Record<string, A>,
}

interface Validator<T = any> {

    validate(data: T[keyof T], rules: string | undefined, allData: T): ValidateT | Promise<ValidateT>,
}

export default Validator