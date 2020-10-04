import Validator from './Validator'
import {getNestedValue, string} from '../utils'

class Required implements Validator {

    validate(value: string | number, afterColumn: string | undefined, allData: { [key: string]: any }) {

        const isValid = !string.isFalsy(value as string)

        if(!afterColumn){
            return { isValid }
        }

        const parts = afterColumn.split("(")

        if (parts.length === 1 &&  getNestedValue(parts[0], allData)) {
            return { isValid }
        }

        if (parts.length === 2) {
            const regExp = /\(([^)]+)\)/
            // getting values inside brackets
            const valueInsideBrackets = regExp.exec(afterColumn)
            // Here we are splitting values by comma, and checking if any of required values
            // equal to actual input value.If yes , than the field is required.

            const isValueMatch =
                valueInsideBrackets
                    ? valueInsideBrackets[1]
                        .split(",")
                        .some(valueInsideBracket => getNestedValue(parts[0], allData) === valueInsideBracket)
                    : false
            if(isValueMatch){
                return { isValid }
            }
        }

        return { isValid: true }
    }

}

export default Required