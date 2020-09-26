import IncludeNumber from "./IncludeNumber";

const notValid = {
    isValid: false
}

const valid = {
    isValid: true
}

describe('IncludeNumber', () => {
    it('should not be valid', () => {
        const IncludeNumberValidator = new IncludeNumber()
        expect(IncludeNumberValidator.validate("")).toStrictEqual(notValid)
        expect(IncludeNumberValidator.validate("ASS")).toStrictEqual(notValid)
        expect(IncludeNumberValidator.validate("asd")).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const IncludeNumberValidator = new IncludeNumber()
        expect(IncludeNumberValidator.validate("8")).toStrictEqual(valid)
        expect(IncludeNumberValidator.validate("asdZ5")).toStrictEqual(valid)
        expect(IncludeNumberValidator.validate("s789S97A")).toStrictEqual(valid)
    })
})
