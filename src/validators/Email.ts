import Validator from './Validator'

class Email implements Validator {

    validate(data: string) {
        return {
            isValid: Boolean(data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)),
        }
    }

}

export default Email