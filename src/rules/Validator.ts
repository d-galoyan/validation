type ValidateT = {
    readonly isValid: boolean,
    readonly additionalData?: {
        [key: string]: string | number,
    },
}

interface Validator {

    validate(data: any, rules: string | undefined, allData: { [key: string]: any }): ValidateT | Promise<ValidateT>,
}

export default Validator