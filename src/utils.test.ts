import {string, hasErrors, getNestedValue} from "./utils"

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

        })

        it('should return false',  () => {

            const hasErr = hasErrors({test: []})
            expect(hasErr).toBe(false)

            const hasErr1 = hasErrors({test: [], test1: []})
            expect(hasErr1).toBe(false)

            const hasErr2 = hasErrors({})
            expect(hasErr2).toBe(false)

        })

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
})
