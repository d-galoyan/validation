import IValidator from './IValidator'

class IncludeSpecialChar implements IValidator {

    validate(data: any) {
        return {
            isValid       : /[!@#$%^&*()_\-{};':"\\|,.<>?]/.test(data),
        }
    }

}

export default IncludeSpecialChar