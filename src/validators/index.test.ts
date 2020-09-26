import defaultValidators from "./index"


describe('defaultValidators', () => {
    it('defaultValidators should exists', () => {
       expect(defaultValidators.required).toBeDefined()
       expect(defaultValidators.email).toBeDefined()
       expect(defaultValidators.match).toBeDefined()
       expect(defaultValidators.includeCapitalLetter).toBeDefined()
       expect(defaultValidators.includeLowercaseLetter).toBeDefined()
       expect(defaultValidators.includeNumber).toBeDefined()
       expect(defaultValidators.includeSpecialChar).toBeDefined()
       expect(defaultValidators.length).toBeDefined()
       expect(defaultValidators.min).toBeDefined()
       expect(defaultValidators.max).toBeDefined()
       expect(defaultValidators.string).toBeDefined()
       expect(defaultValidators.int).toBeDefined()
    })
})
