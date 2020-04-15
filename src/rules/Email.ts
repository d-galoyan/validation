import IValidator from './IValidator'

class Email implements IValidator {

    validate(data: string) {
        return {
            isValid : Boolean(data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)),
        }
    }

}

export default Email