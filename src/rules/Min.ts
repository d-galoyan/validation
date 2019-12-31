import IValidator from "./IValidator";

class Min implements IValidator {

    constructor(private min : number) {
    }

    validate(data: any) {
        return {
            isValid :  data.length >= this.min,
            additionalData : {
                min : this.min
            }
        }
    }

}

export default Min