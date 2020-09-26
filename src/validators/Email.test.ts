import Email from "./Email"

const notValid = {
    isValid: false
}

const valid = {
    isValid: true
}

describe('Email', () => {
    it('should not be valid', () => {
        const emailValidator = new Email()
        expect(emailValidator.validate("")).toStrictEqual(notValid)
        expect(emailValidator.validate("wrongEmail")).toStrictEqual(notValid)
        expect(emailValidator.validate("wrongEmail@mail")).toStrictEqual(notValid)
        expect(emailValidator.validate("wrongEmail.mail.com")).toStrictEqual(notValid)
    })
    it('should be valid', () => {
        const emailValidator = new Email()
        expect(emailValidator.validate("email@mail.com")).toStrictEqual(valid)
        expect(emailValidator.validate("email@email.am")).toStrictEqual(valid)
        expect(emailValidator.validate("email@email.ru")).toStrictEqual(valid)
    })
})
