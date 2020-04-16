import IValidator from './IValidator'

class IncludeNumber implements IValidator {

    validate(data: string) {
        return {
            isValid: /\d/.test(data),
        }
    }

}

export default IncludeNumber