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

    it('Should not be valid if toString method not implemented on value ', () => {
        const notValid2 = {...notValid, errMsg : "Value must implement toString method" }
        const MaxValidator = new Min()
        expect(MaxValidator.validate(undefined as any, testMatchRule)).toStrictEqual(notValid2)
        expect(MaxValidator.validate(null as any, testMatchRule)).toStrictEqual(notValid2)
    })
})
