import IValidator from "./IValidator";

class OnlyInteger implements IValidator {

    validate(data: string | number) {
        return {
            isValid: Number.isInteger(Number(data))
        }
    }

}

export default OnlyInteger