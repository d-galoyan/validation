import IValidator from './IValidator'

class IncludeSpecialChar implements IValidator {

    validate(data: string) {
        return {
            isValid: /[!@#$%^&*()_\-{};':"\\|,.<>?]/.test(data),
        }
    }

}

export default IncludeSpecialChar