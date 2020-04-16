import IValidator from './IValidator'
import {string} from '../utils'

class Required implements IValidator {

    validate(data: string) {
        return {
            isValid: !string.isFalsy(data)
        }
    }

}

export default Required