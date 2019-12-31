import IValidator from './IValidator'

class Match implements IValidator {

    constructor(private matchField: string, private data: { [key: string]: any }) {
    }

    validate(data: any) {
        return {
            isValid : data === this.data[this.matchField],
            additionalData : {
                matchField : this.matchField
            }
        }
    }

}

export default Match