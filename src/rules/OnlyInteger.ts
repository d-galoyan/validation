import IValidator from "./IValidator";

class OnlyInteger implements IValidator {

    validate(data: any) {
        return {
            isValid : Number.isInteger(Number(data))
        }
    }

}

export default OnlyInteger