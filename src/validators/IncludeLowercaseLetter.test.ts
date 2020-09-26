import IncludeLowercaseLetter from "./IncludeLowercaseLetter"

const notValid = {
    isValid: false
}

const valid = {
    isValid: true
}

describe('IncludeLowercaseLetter', () => {
    it('should not be valid', () => {
        const IncludeLowercaseLetterValidator = new IncludeLowercaseLetter()
        expect(IncludeLowercaseLetterValidator.validate("")).toStrictEqual(notValid)
        expect(IncludeLowercaseLetterValidator.validate("ASS")).toStrictEqual(notValid)
        expect(IncludeLowercaseLetterValidator.validate("78997")).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const IncludeLowercaseLetterValidator = new IncludeLowercaseLetter()
        expect(IncludeLowercaseLetterValidator.validate("wA")).toStrictEqual(valid)
        expect(IncludeLowercaseLetterValidator.validate("asdZ")).toStrictEqual(valid)
        expect(IncludeLowercaseLetterValidator.validate("s789S97")).toStrictEqual(valid)
    })
})
