import IValidator from './IValidator'

class OnlyString implements IValidator {

    validate(data: any) {
        return {
            isValid: /^[a-z\-_.äöüß ]+$/i.test(data)
        }
    }

}

export default OnlyString