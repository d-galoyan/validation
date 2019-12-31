import IValidator from './IValidator'

class Email implements IValidator {

    validate(data: any) {
        return {
            isValid : data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
        }
    }

}

export default Email