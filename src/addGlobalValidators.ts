import {GlobalValidator} from "./types"
import defaultValidators from "./validators"

const addGlobalValidators = (validators: GlobalValidator[]) => {
    validators.forEach(({name, validator, errMsg}) => {
        defaultValidators.push({
            name,
            validator,
            errMsg
        })
    })
}

export default addGlobalValidators
