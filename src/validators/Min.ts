import Validator from "./Validator"

class Min implements Validator {

    validate(data: string | number, min: string) {
        try {
            data.toString()
        } catch {
            return {
                isValid        : false,
                additionalData : {
                    min
                },
                errMsg: "Value must implement toString method"
            }
        }
        return {
            isValid        : data.toString().length >= Number(min),
            additionalData : {
                min: min
            }
        }
    }

}

export default Min