import defaultValidators from "./validators"
import overrideErrorMessages from "./overrideErrorMessages"

const errMsg = 'Test error custom message'

describe('override error messages', () => {

    it('should not override error messages for default validators', () => {
        overrideErrorMessages([
            {
                name: "minWrong",
                errMsg
            }
        ])
        expect(defaultValidators.find(v => v.name === "min")?.errMsg).not.toBe(errMsg)
    })

    it('should override error messages for default validators', () => {
        overrideErrorMessages([
            {
                name: "min",
                errMsg
            }
        ])
        expect(defaultValidators.find(v => v.name === "min")?.errMsg).toBe(errMsg)
    })

})
