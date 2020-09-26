import OnlyInteger from "./OnlyInteger";

const notValid = {
    isValid: false,
}


const valid = {
    isValid: true,
}

describe('OnlyInteger', () => {
    it('should not be valid', () => {
        const OnlyIntegerValidator = new OnlyInteger()
        expect(OnlyIntegerValidator.validate("")).toStrictEqual(notValid)
        expect(OnlyIntegerValidator.validate("asd")).toStrictEqual(notValid)
        expect(OnlyIntegerValidator.validate("50d")).toStrictEqual(notValid)

    })

    it('should be valid', () => {
        const OnlyIntegerValidator = new OnlyInteger()
        expect(OnlyIntegerValidator.validate(0)).toStrictEqual(valid)
        expect(OnlyIntegerValidator.validate(5)).toStrictEqual(valid)
        expect(OnlyIntegerValidator.validate(545)).toStrictEqual(valid)
        expect(OnlyIntegerValidator.validate("545")).toStrictEqual(valid)
    })
})