import IValidator from "./IValidator";

class Max implements IValidator {

    validate(data: any, max : string) {
        return {
            isValid : data.toString().length <= Number(max),
            additionalData : {
                max : max
            }
        }
    }

}

export default Max