import Validator from "./Validator"

class Min implements Validator {

    validate(data: string | number, min: string) {
        return {
            isValid        : data.toString().length >= Number(min),
            additionalData : {
                min: min
            }
        }
    }

}

export default Min