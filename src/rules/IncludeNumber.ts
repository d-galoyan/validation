import IValidator from './IValidator'

class IncludeNumber implements IValidator {

    validate(data: any) {
        return {
            isValid       : /\d/.test(data),
        }
    }

}

export default IncludeNumber