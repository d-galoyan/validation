import Match from "./Match"

const notValid = {
    isValid        : false,
    additionalData : {
        matchField: "name",
    }
}


const valid = {
    isValid        : true,
    additionalData : {
        matchField: "name"
    }
}

const allData = {
    name  : "Jhon",
    name2 : "Jhon2",
    name3 : "Jhon"
}

const testMatchRule = "name"

describe('Match', () => {
    it('should not be valid', () => {
        const MatchValidator = new Match()
        expect(MatchValidator.validate(allData.name2, testMatchRule, allData)).toStrictEqual(notValid)
    })

    it('should be valid', () => {
        const MatchValidator = new Match()
        expect(MatchValidator.validate(allData.name3, testMatchRule, allData)).toStrictEqual(valid)
    })
})
