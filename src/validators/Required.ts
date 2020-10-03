import Validator from './Validator'
import {string} from '../utils'

class Required implements Validator {

    validate(value: string , afterColumn: string | undefined, allData: { [key: string]: any }) {

        const isValid = !string.isFalsy(value)

        if(!afterColumn){
            return { isValid }
        }

        const parts = afterColumn.split("(")

        if (parts.length === 1 &&  allData[parts[0]]) {
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
                        .some(valueInsideBracket => allData[parts[0]] === valueInsideBracket)
                    : false
            if(isValueMatch){
                return { isValid }
            }
        }

        return { isValid: true }
    }

}

export default Required