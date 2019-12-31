import IValidator from './IValidator'

class IncludeLowercaseLetter implements IValidator {

    validate(data: any) {
        return {
            isValid       : /[a-z]/.test(data),
        }
    }

}

export default IncludeLowercaseLetter