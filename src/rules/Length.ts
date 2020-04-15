import IValidator from './IValidator'

type Data = string | number

class Length implements IValidator {

    validate(data: Data, minMax: string) {
        const minMaxArr = minMax.split('-')
        const min = Number(minMaxArr[0])
        const max = Number(minMaxArr[1])

        let strData = data

        if (typeof data !== "number") {
            strData = data.toString().length
        }

        return {
            isValid: strData >= min && strData <= max,
            additionalData: {
                min: min,
                max: max
            }
        }
    }

}

export default Length