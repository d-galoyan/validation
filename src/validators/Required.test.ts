import Required from "./Required"

const notValid = {
    isValid: false,
}

const valid = {
    isValid: true,
}

const allDataEmpty = {
    name: ""
}

const allDataFullJhon = {
    name: "Jhon"
}

const allDataFullJZeus = {
    name: "Zeus"
}

const matchRuleOnlyField = "name"
const matchRuleEmptyValues = "name()"
const matchRuleFieldWithValue = "name(Jhon)"
const matchRuleFieldWithValues = "name(Jhon,Zeus)"

describe('Required', () => {
    it('Should not be valid', () => {
        const RequiredValidator = new Required()
        expect(RequiredValidator.validate("", undefined, {})).toStrictEqual(notValid)
        expect(RequiredValidator.validate(0, undefined, {})).toStrictEqual(notValid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValue, allDataFullJhon)).toStrictEqual(notValid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValues, allDataFullJhon)).toStrictEqual(notValid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValues, allDataFullJZeus)).toStrictEqual(notValid)
    })

    it('Should be valid', () => {
        const RequiredValidator = new Required()
        expect(RequiredValidator.validate("a", undefined, {})).toStrictEqual(valid)
        expect(RequiredValidator.validate(5, undefined, {})).toStrictEqual(valid)
        expect(RequiredValidator.validate("", matchRuleOnlyField, allDataEmpty)).toStrictEqual(valid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValues, allDataEmpty)).toStrictEqual(valid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValues, {name: "SomethingElse"})).toStrictEqual(valid)
        expect(RequiredValidator.validate("something", matchRuleOnlyField, allDataFullJhon)).toStrictEqual(valid)
        expect(RequiredValidator.validate("something", matchRuleOnlyField, allDataFullJZeus)).toStrictEqual(valid)
        expect(RequiredValidator.validate("", matchRuleEmptyValues, allDataFullJZeus)).toStrictEqual(valid)
    })

    it('Nested validation. Should not be valid', () => {
        const matchRuleOnlyField = "nested.name"
        const allDataFullJhonNested = {...allDataFullJhon, nested: {
                name: "Jhon"
            }}
        const RequiredValidator = new Required()
        expect(RequiredValidator.validate("", matchRuleOnlyField, allDataFullJhonNested)).toStrictEqual(notValid)
        expect(RequiredValidator.validate("", matchRuleFieldWithValues, allDataFullJhonNested)).toStrictEqual(notValid)
        expect(RequiredValidator.validate("", matchRuleOnlyField, {...allDataFullJhon, nested: {
                name: "Jhon"
            }})).toStrictEqual(notValid)
    })

    it('Nested validation. Should be valid', () => {
        const matchRuleOnlyField = "nested.name"
        const allDataFullJhonNested = {...allDataFullJhon, nested: {
                name: "Jhon"
            }}
        const RequiredValidator = new Required()
        expect(RequiredValidator.validate("something", matchRuleOnlyField, allDataFullJhonNested)).toStrictEqual(valid)
        expect(RequiredValidator.validate("", matchRuleOnlyField, {...allDataFullJhon, nested: {
                name: ""
            }})).toStrictEqual(valid)
    })
})