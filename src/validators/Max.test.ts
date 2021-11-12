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

})
