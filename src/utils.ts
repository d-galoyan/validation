export const string = {
    isFalsy(str: string | null | undefined): boolean {
        return str === ''
            || str === undefined
            || typeof str === undefined
            || str === null
            || str === 'undefined'
    }
}

const test = ["error", {
    name     : 'asd',
    lastname : "das"
}]

const asd = "asdasdasd"
const asdasdasdasdasd = "asdasdasd"

console.log(test, asd, asdasdasdasdasd)