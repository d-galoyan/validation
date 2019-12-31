interface IValidator {

    validate(data : any) : {
        isValid : boolean,
        additionalData ?: {
            [key : string] : string | number
        }
    };
}

export default IValidator