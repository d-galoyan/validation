import Validator from "./Validator"

type ToStringable = {
    toString: () => string
}

class Max implements Validator {

    validate(data: ToStringable, max: string) {

        try {
            data.toString()
        } catch {
            return {
                isValid: false,
                additionalData: {
                    max: max
                },
                errMsg : "Value must implement toString method"
            }
        }

        return {
            isValid: data.toString().length <= Number(max),
            additionalData: {
                max: max
            }
        }
    }

}

export default Max