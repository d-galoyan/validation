import Required from "./Required"
import Email from "./Email"
import Match from "./Match"
import IncludeCapitalLetter from "./IncludeCapitalLetter"
import IncludeLowercaseLetter from "./IncludeLowercaseLetter"
import IncludeNumber from "./IncludeNumber"
import IncludeSpecialChar from "./IncludeSpecialChar"
import Length from "./Length"
import Min from "./Min"
import Max from "./Max"
import OnlyAlpha from "./OnlyAlpha"
import OnlyInteger from "./OnlyInteger"
import {GlobalValidator} from "../types"

const defaultValidators : GlobalValidator[] = [
    {
        name      : 'required',
        validator : new Required(),
        errMsg    : '{field} is required'
    },
    {
        name      : 'email',
        validator : new Email(),
        errMsg    : 'Email format is wrong'
    },
    {
        name      : 'match',
        validator : new Match(),
        errMsg    : '{field} does not match with the {matchedField}'
    },
    {
        name      : 'includeCapitalLetter',
        validator : new IncludeCapitalLetter(),
        errMsg    : '{field} should include capital letters'
    },
    {
        name      : 'includeLowercaseLetter',
        validator : new IncludeLowercaseLetter(),
        errMsg    : '{field} should include lowercase letters'
    },
    {
        name      : "includeNumber",
        validator : new IncludeNumber(),
        errMsg    : '{field} should include at least one number'
    },
    {
        name      : "includeSpecialChar",
        validator : new IncludeSpecialChar(),
        errMsg    : '{field} should include at least one special character'
    },
    {
        name      : "length",
        validator : new Length(),
        errMsg    : '{field} length should be between {min} and {max}'
    },
    {
        name      : "min",
        validator : new Min(),
        errMsg    : '{field} length should be minimum {min}'
    },
    {
        name      : "max",
        validator : new Max(),
        errMsg    : '{field} length should be maximum {max}'
    },
    {
        name      : "string",
        validator : new OnlyAlpha(),
        errMsg    : '{field} should include only alpha characters'
    },
    {
        name      : "int",
        validator : new OnlyInteger(),
        errMsg    : '{field} should include only integers'
    },
]

export default defaultValidators
