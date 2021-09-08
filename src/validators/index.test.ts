import defaultValidators from "./index"


describe('defaultValidators', () => {
    it('defaultValidators should exists', () => {
       expect(defaultValidators.find(v => v.name === 'required')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'required')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'match')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'includeCapitalLetter')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'includeLowercaseLetter')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'includeNumber')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'includeSpecialChar')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'length')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'min')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'max')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'string')).toBeDefined()
       expect(defaultValidators.find(v => v.name === 'int')).toBeDefined()
    })
})
