import Validator from './Validator'
import {getNestedValue} from "../utils"

class Match implements Validator {

    validate(value: string | number, matchField: string, data: { [key: string]: any }) {

        return {
            isValid        : value === getNestedValue(matchField, data),
            additionalData : {
                matchField: matchField
            }
        }
    }

}

export default Match