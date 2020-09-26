import OnlyAlpha from "./OnlyAlpha"

const notValid = {
    isValid: false,
}

const valid = {
    isValid: true,
}

describe('OnlyAlpha', () => {
    it('should not be valid', () => {
        const OnlyStringValidator = new OnlyAlpha()
        expect(OnlyStringValidator.validate(0)).toStrictEqual(notValid)
        expect(OnlyStringValidator.validate("4")).toStrictEqual(notValid)
        expect(OnlyStringValidator.validate("456")).toStrictEqual(notValid)
        expect(OnlyStringValidator.validate("456ss")).toStrictEqual(notValid)

    })

    it('should be valid', () => {
        const OnlyStringValidator = new OnlyAlpha()
        expect(OnlyStringValidator.validate("")).toStrictEqual(valid)
        expect(OnlyStringValidator.validate("asdasd")).toStrictEqual(valid)
        expect(OnlyStringValidator.validate("sdAA")).toStrictEqual(valid)
    })
})