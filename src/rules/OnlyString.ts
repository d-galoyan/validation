import IValidator from './IValidator'

class OnlyString implements IValidator {

    validate(data: string) {
        return {
            isValid: /^[a-z\-_.äöüß ]+$/i.test(data)
        }
    }

}

export default OnlyString