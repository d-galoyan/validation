import Validation from "./Validation"
import Validator from "./validators/Validator"
import {object} from "./utils"

class TestValidator implements Validator {
    isValid : boolean
    constructor(pass ?: boolean) {
        this.isValid = pass === undefined ? true : pass
    }
    validate() {
        return {isValid: this.isValid, errMsg: "Internal error message"}
    }
}

const testData = {
    name     : "David",
    lastname : "Galoyan",
    salary   : 100000,
}

const reqErrObj = {
    errMsg         : "{field} is required",
    additionalData : {}
}

const intErrObj = {
    errMsg         : '{field} should include only integers',
    additionalData : {}
}

const minErrObj = {
    errMsg         : '{field} length should be minimum {min}',
    additionalData : {
        min: "7"
    }
}

type User = {
    name: string,
    person: {
        salary: number,
        address: {
            street: string,
            building: number,
            apt: number,
        },
    },
}

describe("Validation", () => {
    it("Should add validator", () => {
        const validation = new Validation()
        validation.addValidators([{
                name      : "TestValidator",
                validator : new TestValidator(),
                errMsg    : "error message"
        }])
        expect(validation["validators"].find(v => v.name === "TestValidator")).toBeDefined()
    })

    it("Default Messages should be overridden", async () => {
        const validation = new Validation()
        validation.messages({
            int: "some int error message",
        }).rules({
            name: "int"
        })
        await validation.validate({
            name: "asd"
        })
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name[0].errMsg).toBe('some int error message')
                expect(err.name[0].additionalData).toStrictEqual({})
            })

    })

    it("Default Messages should not be overridden", async () => {
        const validation = new Validation()
        validation.messages({
            intsss: "some int error message",
        }).rules({
            name: "int"
        })
        await validation.validate({
            name: "asd"
        })
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name[0].errMsg).toBe('{field} should include only integers')
                expect(err.name[0].additionalData).toStrictEqual({})
            })

    })

    it("Validator error message should be used, instead of default one", async () => {
        const validation = new Validation()
        validation
            .addValidators([{
                    name      : "TestValidator",
                    validator : new TestValidator(false),
                    errMsg    : "error message"
            }])
            .messages({
                TestValidator: "some int error message",
            }).rules({
            name: "TestValidator"
        })
        await validation.validate({
            name: "asd"
        })
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name).toMatchObject([
                    {
                        errMsg         : 'Internal error message',
                        additionalData : {}
                    }
                ])
            })

    })

    it("Should set listener", async () => {
        const validation = new Validation()
        const testListener = jest.fn()
        validation
            .addResultListener(testListener)
            .addResultListener(testListener)
        validation.rules({
            name     : "required|string",
            lastname : "required|string",
            salary   : "int",
        })
        await validation.validate(testData)
        expect(testListener).toBeCalledTimes(2)
    })

    it("Should Not fail", async () => {
        const validation = new Validation()
        validation.rules({
            name     : "required|string",
            lastname : "required|string",
            salary   : "int",
        })
        await validation.validate(testData)
        expect(true).toBe(true)
    })

    it("Should fail", async () => {
        const validation = new Validation()
        validation.rules({
            name     : "required|string",
            lastname : "required|string",
            salary   : "int",
        })
        const copied = object.copy(testData)
        copied.salary = 0
        await validation.validate(copied)
            .catch((err) => {
                expect(err.salary).toStrictEqual([intErrObj])
            })

        const copied2 = object.copy(testData)
        copied2.name = ""
        await validation.validate(copied2)
            .catch((err) => {
                expect(err.name).toStrictEqual([reqErrObj])
                expect(err.lastname).toStrictEqual([])
            })
    })

    it("should not validate", async () => {
        const validation = new Validation()
        validation.shouldValidate({
            name: {shouldValidate: async () => false}
        }).rules({
            name: "required"
        })
        await validation.validate({})
            .then(() => expect(true).toBe(true))
            .catch(() => expect(true).toBe(false))
    })

    it("should validate", async () => {
        const validation = new Validation()
        validation.shouldValidate({
            name: {shouldValidate: async () => true}
        }).rules({
            name: "required"
        })
        await validation.validate({})
            .then(() => expect(true).toBe(false))
            .catch(() => expect(true).toBe(true))
    })

    it("should not validate if omtEmpty presents", async () => {
        const validation = new Validation()
        validation.rules({
            name: "omitEmpty|required|int"
        })
        await validation.validate({name: ""})
            .then(() => expect(true).toBe(true))
            .catch(() => expect(true).toBe(false))
    })

    it("shout not validate if rules are empty", async () => {
        const validation = new Validation()
        validation.rules({
            name: ""
        })
        await validation.validate({})
            .then(() => expect(true).toBe(false))
            .catch(() => expect(true).toBe(true))
    })

    it("shout trow if validator name doesn't exists", async () => {
        const validation = new Validation()
        validation.rules({
            name: "wrongValidator"
        })
        await expect(validation.validate({}))
            .rejects
            .toThrow('Please provide existing validator name for name. wrongValidator doesn\'t exists!')
    })

    it("shout stop on error", async () => {
        const validation = new Validation()
        validation.rules({
            name: "bail|required|int"
        })
        await validation.validate({})
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name).toStrictEqual([reqErrObj])
            })
    })

    it("shout to not stop on error", async () => {
        const validation = new Validation()
        validation.rules({
            name: "required|int"
        })
        await validation.validate({name: ""})
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name).toStrictEqual([reqErrObj, intErrObj])
            })
    })

    it("Nested object validation should fail", async () => {

        const userValidation = new Validation<User>()
        const addressValidation = new Validation<User["person"]["address"]>().rules({
            street   : "required|min:7",
            building : "required",
            apt      : "required"
        })
        const personValidation = new Validation<User["person"]>().rules({
            salary  : "required",
            address : addressValidation
        })

        userValidation.rules({
            name   : "required",
            person : personValidation
        })

        await userValidation.validate({
            name   : "",
            person : {
                salary  : 0,
                address : {
                    street   : "Shiraz",
                    building : 44,
                    apt      : 0
                }
            }
        })
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name).toStrictEqual([reqErrObj])
                expect(err.person).toStrictEqual({
                    salary  : [reqErrObj],
                    address : {apt: [reqErrObj], building: [], street: [minErrObj]}
                })
            })
    })

    it("Nested object validation should pass", async () => {

        const userValidation = new Validation<User>()
        const addressValidation = new Validation<User["person"]["address"]>().rules({
            street   : "required|min:7",
            building : "required",
            apt      : "required"
        })
        const personValidation = new Validation<User["person"]>().rules({
            salary  : "required",
            address : addressValidation
        })

        userValidation.rules({
            name   : "required",
            person : personValidation
        })

        await userValidation.validate({
            name   : "David",
            person : {
                salary  : 10,
                address : {
                    street   : "Shirazz",
                    building : 44,
                    apt      : 10
                }
            }
        })
            .then(() => expect(true).toBe(true))
            .catch(() => expect(true).toBe(false))
    })
})
