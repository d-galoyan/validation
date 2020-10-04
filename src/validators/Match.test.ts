import Match from "./Match"

const allData = {
    name     : "Jhon",
    name2    : "Jhon2",
    name3    : "Jhon",
    name4    : "Foo",
    stranger : {
        name : "Jhon",
        foo  : {
            name: "Foo"
        }
    }
}

const cases = [
    {
        value     : "Jhon2",
        matchRule : "name",
        result    : {
            isValid        : false,
            additionalData : {
                matchField: "name",
            }
        }
    },
    {
        value     : "Jhon",
        matchRule : "name",
        result    : {
            isValid        : true,
            additionalData : {
                matchField: "name",
            }
        }
    },
    {
        value     : "Jhon2",
        matchRule : "stranger.name",
        result    : {
            isValid        : false,
            additionalData : {
                matchField: "stranger.name",
            }
        }
    },
    {
        value     : "Jhon",
        matchRule : "stranger.foo.name",
        result    : {
            isValid        : false,
            additionalData : {
                matchField: "stranger.foo.name"
            }
        }
    },
    {
        value     : "Foo",
        matchRule : "stranger.foo.name",
        result    : {
            isValid        : true,
            additionalData : {
                matchField: "stranger.foo.name"
            }
        }
    },
]

describe('Match', () => {

    it("Test Cases", () => {
        const MatchValidator = new Match()
        cases.forEach(testCase => {
            expect(MatchValidator.validate(testCase.value, testCase.matchRule, allData)).toStrictEqual(testCase.result)
        })
    })
})