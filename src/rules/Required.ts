import Validator from './Validator'
import {string} from '../utils'

class Required implements Validator {

    validate(data: string) {

        return {
            isValid: !string.isFalsy(data)
        }
    }

}

export default Required