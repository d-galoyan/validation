import Min from "./Min"

const notValid = {
    isValid        : false,
    additionalData : {
        min: "3",
    }
}

const valid = {
    isValid        : true,
    additionalData : {
        min: "3"
    }
}

const testMatchRule = "3"

describe('Min', () => {
    it('should not be valid', () => {
        const MinValidator = new Min()
        expect(MinValidator.validate("", testMatchRule)).toStrictEqual(notValid)
        expect(MinValidator.validate(1, testMatchRule)).toStrictEqual(notValid)
        expect(MinValidator.validate(22, testMatchRule)).toStrictEqual(notValid)
        expect(MinValidator.validate("a", testMatchRule)).toStrictEqual(notValid)
        expect(MinValidator.validate("aa", testMatchRule)).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const MinValidator = new Min()
        expect(MinValidator.validate("aaa", testMatchRule)).toStrictEqual(valid)
        expect(MinValidator.validate("aaaa", testMatchRule)).toStrictEqual(valid)
        expect(MinValidator.validate(333, testMatchRule)).toStrictEqual(valid)
        expect(MinValidator.validate(222, testMatchRule)).toStrictEqual(valid)
        expect(MinValidator.validate(4444, testMatchRule)).toStrictEqual(valid)
    })
})
