export const string = {
    isFalsy(str: string | null | undefined): boolean {
        return str === ''
            || str === undefined
            || typeof str === undefined
            || str === null
            || str === 'undefined'
    }
}