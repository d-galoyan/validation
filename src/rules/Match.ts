import IValidator from './IValidator'

class Match implements IValidator {

    validate(value: any, matchField: string, data: { [key: string]: any }) {
        return {
            isValid : value === data[matchField],
            additionalData : {
                matchField : matchField
            }
        }
    }

}

export default Match