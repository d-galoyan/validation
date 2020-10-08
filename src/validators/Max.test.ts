import Max from "./Max"

const notValid = {
    isValid        : false,
    additionalData : {
        max: "3",
    }
}


const valid = {
    isValid        : true,
    additionalData : {
        max: "3"
    }
}


const testMatchRule = "3"

describe('Max', () => {
    it('should not be valid', () => {
        const MaxValidator = new Max()
        expect(MaxValidator.validate("asdd", testMatchRule)).toStrictEqual(notValid)
        expect(MaxValidator.validate(55555, testMatchRule)).toStrictEqual(notValid)
    })

    it('Should be valid', () => {
        const MaxValidator = new Max()
        expect(MaxValidator.validate("", testMatchRule)).toStrictEqual(valid)
        expect(MaxValidator.validate("as", testMatchRule)).toStrictEqual(valid)
        expect(MaxValidator.validate("ass", testMatchRule)).toStrictEqual(valid)
        expect(MaxValidator.validate(444, testMatchRule)).toStrictEqual(valid)
        expect(MaxValidator.validate(22, testMatchRule)).toStrictEqual(valid)
    })

    it('Should not be valid if toString method not implemented on value ', () => {
        const notValid2 = {...notValid, errMsg : "Value must implement toString method" }
        const MaxValidator = new Max()
        expect(MaxValidator.validate(undefined as any, testMatchRule)).toStrictEqual(notValid2)
        expect(MaxValidator.validate(null as any, testMatchRule)).toStrictEqual(notValid2)
    })
})
