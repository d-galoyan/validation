import IValidator from './IValidator'

class IncludeLowercaseLetter implements IValidator {

    validate(data: string) {
        return {
            isValid: /[a-z]/.test(data),
        }
    }

}

export default IncludeLowercaseLetter