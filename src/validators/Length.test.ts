import Length from "./Length"

const notValid = {
    isValid        : false,
    additionalData : {
        max : 9,
        min : 5
    }
}


const valid = {
    isValid        : true,
    additionalData : {
        max : 9,
        min : 5
    }
}

const testMatchRule = "5-9"

describe('Length', () => {
    it('should not be valid', () => {
        const LengthValidator = new Length()
        expect(LengthValidator.validate("", testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate("asds", testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate("6", testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate("as", testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate("asasdasdasdasd", testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate(10, testMatchRule)).toStrictEqual(notValid)
        expect(LengthValidator.validate(4, testMatchRule)).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const LengthValidator = new Length()
        expect(LengthValidator.validate(5, testMatchRule)).toStrictEqual(valid)
        expect(LengthValidator.validate(9, testMatchRule)).toStrictEqual(valid)
        expect(LengthValidator.validate("asdas", testMatchRule)).toStrictEqual(valid)
        expect(LengthValidator.validate("12345", testMatchRule)).toStrictEqual(valid)
        expect(LengthValidator.validate("123456789", testMatchRule)).toStrictEqual(valid)
    })
})
