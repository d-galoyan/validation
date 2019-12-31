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
        return {
            isValid       : data.length >= this.min && data.length <= this.max,
            additionalData: {
                min: this.min,
                max: this.max
            }
        }
    }

}

export default Length