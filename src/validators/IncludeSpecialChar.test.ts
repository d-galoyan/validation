import IncludeSpecialChar from "./IncludeSpecialChar"

const notValid = {
    isValid: false
}

const valid = {
    isValid: true
}

describe('IncludeSpecialChar', () => {
    it('should not be valid', () => {
        const IncludeSpecialCharValidator = new IncludeSpecialChar()
        expect(IncludeSpecialCharValidator.validate("")).toStrictEqual(notValid)
        expect(IncludeSpecialCharValidator.validate("ASS")).toStrictEqual(notValid)
        expect(IncludeSpecialCharValidator.validate("asd")).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const IncludeSpecialCharValidator = new IncludeSpecialChar()
        expect(IncludeSpecialCharValidator.validate("*")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(">asd")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("<")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("!")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("@")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("#")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("$")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("%")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("^")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("&")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("(")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(")")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("_")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(";")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("'")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(":")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate("|")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(",")).toStrictEqual(valid)
        expect(IncludeSpecialCharValidator.validate(".")).toStrictEqual(valid)
    })
})
