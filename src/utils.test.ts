import {string, hasErrors, getNestedValue, shouldNotValidate} from "./utils"

describe("utils",  () => {
    describe('string.isFalsy', () => {
        it('should return false',  () => {

            const undefStr = string.isFalsy(undefined)
            expect(undefStr).toBe(true)

            const nullStr = string.isFalsy(null)
            expect(nullStr).toBe(true)

            const emptyStr = string.isFalsy("")
            expect(emptyStr).toBe(true)

            const undefinedStr = string.isFalsy("undefined")
            expect(undefinedStr).toBe(true)
        })
    })

    describe('hasErrors', () => {
        it('should return true',  () => {

            const hasErr = hasErrors({test: [{}]})
            expect(hasErr).toBe(true)

            const hasErr1 = hasErrors({test: [{}], test1: []})
            expect(hasErr1).toBe(true)

            const hasErr2 = hasErrors({test: [], test1: { asd: [], asd2: [{}]}})
            expect(hasErr2).toBe(true)

            const hasErr3 = hasErrors({test: [[{}], []]})
            expect(hasErr3).toBe(true)

        })

        it('should return false',  () => {

            const hasErr = hasErrors({test: []})
            expect(hasErr).toBe(false)

            const hasErr1 = hasErrors({test: [], test1: []})
            expect(hasErr1).toBe(false)

            const hasErr2 = hasErrors({})
            expect(hasErr2).toBe(false)

            const hasErr3 = hasErrors({test: [], test1: { asd: [], asd2: []}})
            expect(hasErr3).toBe(false)

            const hasErr4 = hasErrors({test: [[]]})
            expect(hasErr4).toBe(false)

        })
    })

    describe('GetNestedValue', () => {
        it('GetNestedValue',  () => {
            const nestedObject = {
                user: {
                    person: {
                        address: {
                            street : "Baker",
                            apt    : 12
                        },
                        salary: 10
                    },
                    name: "David"
                }
            }

            const name = getNestedValue("user.name", nestedObject)
            expect(name).toBe("David")
            const salary = getNestedValue("user.person.salary", nestedObject)
            expect(salary).toBe(10)
            const street = getNestedValue("user.person.address.street", nestedObject)
            expect(street).toBe("Baker")
        })
    })

    describe('shouldNotValidate', () => {
        it('Should return truthy',  async () => {
            const validate = await shouldNotValidate(
                'name',
                '',
                {
                    stopOnError           : {},
                    omitEmpty             : {},
                    shouldValidateFields  : {},
                    validateEachArrayItem : {}
                },
                { name: ''})

            expect(validate).toBeUndefined()

            const validate2 = await shouldNotValidate(
                'name',
                '',
                {
                    stopOnError           : {},
                    omitEmpty             : {},
                    validateEachArrayItem : {},
                    shouldValidateFields  : {
                        name: {
                            shouldValidate: async () => false
                        }
                    }
                },
                { name: ''})
            expect(validate2).toBe(true)

            const validate3 = await shouldNotValidate(
                'name',
                '',
                {
                    stopOnError           : {},
                    omitEmpty             : {},
                    validateEachArrayItem : {},
                    shouldValidateFields  : {
                        name: {
                            shouldValidate: async () => true
                        }
                    }
                },
                { name: ''})
            expect(validate3).toBeFalsy()
        })
    })
})
