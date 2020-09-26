import Validator from './Validator'

class IncludeSpecialChar implements Validator {

    validate(data: string) {
        return {
            isValid: /[!@#$%^&*()_\-{};':"\\|,.<>?]/.test(data),
        }
    }

}

export default IncludeSpecialChar