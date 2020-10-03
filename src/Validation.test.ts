import Validation from "./Validation"
import Validator from "./validators/Validator"
import {copy} from "./utils"

class TestValidator implements Validator {
    validate() {
        return {isValid: true}
    }
}

const testData = {
    name     : "David",
    lastname : "Galoyan",
    salary   : 100000,
}

const reqErrObj = {
    errMsg         : "must.not.be.empty",
    additionalData : {}
}

const intErrObj = {
    errMsg         : 'must.be.only.number',
    additionalData : {}
}

describe("Validation", () => {
    it("Should add validator", () => {
        const validation = new Validation()
        validation.addValidators({
            TestValidator: {
                validator : new TestValidator(),
                errMsg    : "error message"
            }
        })
        expect(validation["validators"]["TestValidator"]).toBeDefined()
    })

    it("Should set shouldValidate", () => {
        const validation = new Validation()
        validation.shouldValidate({
            name: {validate: () => true}
        })
        expect(validation["configs"].shouldValidateFields["name"]).toBeDefined()
    })

    it("Should set messages", () => {
        const validation = new Validation()
        validation.messages({
            int  : "some other message",
            int2 : "some other message",
        })
        expect(validation["configs"].messages["int"]).toBeDefined()
        expect(validation["configs"].messages["int2"]).toBeDefined()
    })

    it("Messages should be overridden", async () => {
        const validation = new Validation()
        validation.messages({
            int: "some int error message",
        })
        validation.rules({
            name: "int"
        })
        await validation.validate({
            name: "asd"
        })
            .then(() => expect(true).toBe(false))
            .catch(err => {
                expect(err.name).toStrictEqual([
                    {
                        errMsg         : 'some int error message',
                        additionalData : {}
                    }
                ])
            })

    })

    it("Should set listener", () => {
        const validation = new Validation()
        const testListener = (res: any) => {
            console.log(res)
        }
        validation.onResultListener(testListener)
        expect(validation["listener"]).toStrictEqual(testListener)
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
        const copied = copy(testData)
        copied.salary = ""
        await validation.validate(copied)
            .catch((err) => {
                expect(err.salary).toStrictEqual([intErrObj])
            })

        const copied2 = copy(testData)
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
        })
        validation.rules({
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
        })
        validation.rules({
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

    it("Nested object validation", async () => {
        type User = {
            name: string,
            person: {
                salary: number,
                address : {
                    street   : string,
                    building : number,
                    apt      : number,
                },
            },
        }

        const userValidation = new Validation<User>()
        const addressValidation = new Validation<User["person"]["address"]>().rules({
            street   : "required",
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
                expect(err.person).toStrictEqual([{
                    salary  : [reqErrObj],
                    address : [{apt: [reqErrObj], building: [], street: []}]
                }])
            })

        await userValidation.validate({
            name   : "David",
            person : {
                salary  : 10,
                address : {
                    street   : "Shiraz",
                    building : 44,
                    apt      : 10
                }
            }
        })
            .then(() => expect(true).toBe(true))
            .catch(() => expect(true).toBe(false))
    })
})