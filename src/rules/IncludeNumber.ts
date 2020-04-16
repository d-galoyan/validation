import Validator from './Validator'

class IncludeNumber implements Validator {

    validate(data: string) {
        return {
            isValid: /\d/.test(data),
        }
    }

}

export default IncludeNumber