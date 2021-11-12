import Validator from "./Validator"

class Max implements Validator {

    validate(data: string | number, max: string) {

        return {
            isValid        : `${data}`.length <= Number(max),
            additionalData : {
                max: max
            }
        }
    }

}

export default Max