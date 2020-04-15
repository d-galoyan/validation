import IValidator from "./IValidator";

class Min implements IValidator {

    validate(data: any, min : string) {
        return {
            isValid :  data.toString().length >= Number(min),
            additionalData : {
                min : min
            }
        }
    }

}

export default Min