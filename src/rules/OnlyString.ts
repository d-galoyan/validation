import Validator from './Validator'

class OnlyString implements Validator {

    validate(data: string) {
        return {
            isValid: /^[a-zA-Z\-_.äöüß ]+$/i.test(data)
        }
    }

}

export default OnlyString