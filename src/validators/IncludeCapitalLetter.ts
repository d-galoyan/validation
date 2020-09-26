import Validator from './Validator'

class IncludeCapitalLetter implements Validator {

    validate(data: string) {
        return {
            isValid: /[A-Z]/.test(data),
        }
    }

}

export default IncludeCapitalLetter