import defaultValidators from "./validators"

const overrideErrorMessages = (messages: {name : string; errMsg : string}[]) => {
    messages.forEach(({name, errMsg}) => {
      const validator = defaultValidators.find(v => v.name === name)
        if(validator){
            validator.errMsg = errMsg
        }
    })
}

export default overrideErrorMessages
