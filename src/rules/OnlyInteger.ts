import Validator from "./Validator"

class OnlyInteger implements Validator {

    validate(data: string | number) {
        return {
            isValid: Number.isInteger(Number(data))
        }
    }

}

export default OnlyInteger