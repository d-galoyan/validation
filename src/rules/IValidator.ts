type ValidateT = {
    readonly isValid: boolean,
    readonly additionalData?: {
        [key: string]: string | number
    }
}

/*interface ValidateData {
    data : any,
    rules : string | undefined,
    allData : {[key : string] : any}
}*/

interface IValidator {

    validate(data: any, rules: string | undefined, allData: { [key: string]: any }): ValidateT | Promise<ValidateT>;
}

export default IValidator