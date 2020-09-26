import Validator from "./Validator"
import {string} from "../utils"

class OnlyInteger implements Validator {

    validate(data: string | number) {

        if(data === 0){
            return { isValid: true }
        }

        return {
            isValid: !string.isFalsy(data  as string) && Number.isInteger(Number(data))
        }
    }

}

export default OnlyInteger