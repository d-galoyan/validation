import {GlobalValidator} from "./types"
import defaultValidators from "./validators"

const addGlobalValidators = (validators: GlobalValidator[]) => {
    validators.forEach(validator => {
        defaultValidators[validator.name] = {
            validator : validator.validator,
            errMsg    : validator.errMsg
        }
    })
}

export default addGlobalValidators