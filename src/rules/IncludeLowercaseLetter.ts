import Validator from './Validator'

class IncludeLowercaseLetter implements Validator {

    validate(data: string) {
        return {
            isValid: /[a-z]/.test(data),
        }
    }

}

export default IncludeLowercaseLetter