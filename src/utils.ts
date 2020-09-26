import {Results} from "./types"

export const string = {
  isFalsy(str: string | null | undefined): boolean {
    return !str
        || str === ''
        || str === undefined
        || typeof str === undefined
        || str === null
        || str === 'undefined'
  }
}

export const  hasErrors = <T>(results: Results<T>) => Object.keys(results).some(fieldName => results[fieldName].length > 0)
export const copy = (obj: Record<string, any>) => JSON.parse(JSON.stringify(obj))