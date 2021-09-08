import addGlobalValidators from "./addGlobalValidators"
import Validator from "./validators/Validator"
import defaultValidators from "./validators"

class TestValidator implements Validator {
    validate(data: any) {
        if(data === "test"){
            return { isValid: true}
        }
        return { isValid: false}
    }
}

describe('addGlobalValidators', () => {
    it('should add validators globally', () => {
        addGlobalValidators([
            {
                name      : "TestValidator",
                validator : new TestValidator(),
                errMsg    : "Test error"
            }
        ])
        expect(defaultValidators.find(v => v.name === "TestValidator")).toBeDefined()
    })

})
