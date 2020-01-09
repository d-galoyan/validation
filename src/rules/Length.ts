import IValidator from './IValidator'

class Length implements IValidator {

    min: number
    max: number

    constructor(minMax: string) {
        const minMaxArr = minMax.split('-')

        this.min = Number(minMaxArr[0])
        this.max = Number(minMaxArr[1])
    }

    validate(data: string) {

        const strData = toString()

        return {
            isValid       : strData.length >= this.min && strData.length <= this.max,
            additionalData: {
                min: this.min,
                max: this.max
            }
        }
    }

}

export default Length