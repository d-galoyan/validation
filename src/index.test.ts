import * as Defaults from "./index"

describe("Defaults", () => {
    it("test defaults", () => {
      expect(Defaults.Validation).toBeDefined()
      expect(Defaults.addGlobalValidators).toBeDefined()
      expect(Defaults.getNestedValue).toBeDefined()
    })
})