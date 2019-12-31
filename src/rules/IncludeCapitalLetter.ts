import IValidator from './IValidator'

class IncludeCapitalLetter implements IValidator {

    validate(data: any) {
        return {
            isValid       : /[A-Z]/.test(data),
        }
    }

}

export default IncludeCapitalLetter