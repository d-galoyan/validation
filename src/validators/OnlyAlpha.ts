import Validator from './Validator'

class OnlyAlpha implements Validator {

    validate(data: string | number) {
        if (Number.isInteger(data)) {
            return {isValid: false}
        }

        if (data === "") {
            return {isValid: true}
        }
        return {
            isValid: /^[a-zA-Z\-_.äöüß ]+$/i.test(data as string)
        }
    }

}

export default OnlyAlpha