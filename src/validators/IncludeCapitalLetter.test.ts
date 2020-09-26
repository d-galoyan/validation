import IncludeCapitalLetter from "./IncludeCapitalLetter";

const notValid = {
    isValid: false
}

const valid = {
    isValid: true
}

describe('IncludeCapitalLetter', () => {
    it('should not be valid', () => {
        const IncludeCapitalLetterValidator = new IncludeCapitalLetter()
        expect(IncludeCapitalLetterValidator.validate("")).toStrictEqual(notValid)
        expect(IncludeCapitalLetterValidator.validate("asd")).toStrictEqual(notValid)
        expect(IncludeCapitalLetterValidator.validate("78997")).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const IncludeCapitalLetterValidator = new IncludeCapitalLetter()
        expect(IncludeCapitalLetterValidator.validate("A")).toStrictEqual(valid)
        expect(IncludeCapitalLetterValidator.validate("asdZ")).toStrictEqual(valid)
        expect(IncludeCapitalLetterValidator.validate("789S97")).toStrictEqual(valid)
    })
})
