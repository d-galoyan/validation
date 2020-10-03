import Validator from './Validator'

class Match implements Validator {

    validate(value: string | number, matchField: string, data: { [key: string]: any }) {
        return {
            isValid        : value === data[matchField],
            additionalData : {
                matchField: matchField
            }
        }
    }

}

export default Match