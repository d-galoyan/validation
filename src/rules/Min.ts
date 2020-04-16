import Validator from "./Validator"

class Min implements Validator {

    validate(data: string, min: string) {
        return {
            isValid        : data.toString().length >= Number(min),
            additionalData : {
                min: min
            }
        }
    }

}

export default Min