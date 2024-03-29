import parseValidationRules from "./parseValidationRules"
import configs from "./mockes/configs"
import {object} from "./utils"
import Validation from "./Validation"

describe('parseValidationRules', () => {
    it('should return empty object', () => {
        const rules = parseValidationRules({}, configs)
        expect(rules).toStrictEqual({})
    })

    it('should set configs stopOnError ', () => {
        const testRulesObj = {
            name: "bail|required"
        }
        const copiedConfigs = object.copy(configs)
        parseValidationRules(testRulesObj, copiedConfigs)
        expect(copiedConfigs.stopOnError).toStrictEqual({name: true})
    })

    it('should set configs omitEmpty ', () => {
        const testRulesObj = {
            name     : "omitEmpty|required",
            lastname : "min:8"
        }
        const copiedConfigs = object.copy(configs)
        parseValidationRules(testRulesObj, copiedConfigs)
        expect(copiedConfigs.omitEmpty).toStrictEqual({name: true})
    })

    it('should set configs validateEachArrayItem ', () => {
        const testRulesObj = {
            name     : "validateEachArrayItem|required",
            lastname : "min:8"
        }
        const copiedConfigs = object.copy(configs)
        parseValidationRules(testRulesObj, copiedConfigs)
        expect(copiedConfigs.validateEachArrayItem).toStrictEqual({name: true})
    })

    it('should parse correctly', () => {
        const testRulesObj = {
            name     : "required|min:9|max:16|string|testRule",
            lastname : "min:8|testRule2:testMatch"
        }
        const rules = parseValidationRules(testRulesObj, configs)
        expect(rules).toStrictEqual({
            name: {
                required : undefined,
                min      : "9",
                max      : "16",
                string   : undefined,
                testRule : undefined
            },
            lastname: {
                min       : "8",
                testRule2 : "testMatch"
            }
        })
    })

    it('should parse correctly if validation rule is Validation instance', () => {
        const validationInstance = new Validation()
        const testRulesObj = {
            name     : "required|min:9|max:16|string|testRule",
            lastname : "min:8|testRule2:testMatch",
            validationInstance,
        }
        const rules = parseValidationRules(testRulesObj, configs)
        expect(rules).toStrictEqual({
            name: {
                required : undefined,
                min      : "9",
                max      : "16",
                string   : undefined,
                testRule : undefined
            },
            lastname: {
                min       : "8",
                testRule2 : "testMatch"
            },
            validationInstance
        })
    })
})