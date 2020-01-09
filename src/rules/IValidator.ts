type ValidateT = {
    isValid : boolean,
    additionalData ?: {
        [key : string] : string | number
    }
}

interface IValidator {

    validate(data : any) : ValidateT | Promise<ValidateT>;
}

export default IValidator