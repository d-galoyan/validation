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

const defaultValidators = [
    {
        name      : 'required',
        validator : new Required(),
        errMsg    : 'must.not.be.empty'
    },
    {
        name      : 'email',
        validator : new Email(),
        errMsg    : 'must.be.email'
    },
    {
        name      : 'match',
        validator : new Match(),
        errMsg    : 'must.match'
    },
    {
        name      : 'includeCapitalLetter',
        validator : new IncludeCapitalLetter(),
        errMsg    : 'must.contain.cap.letter'
    },
    {
        name      : 'includeLowercaseLetter',
        validator : new IncludeLowercaseLetter(),
        errMsg    : 'must.contain.low.letter'
    },
    {
        name      : "includeNumber",
        validator : new IncludeNumber(),
        errMsg    : 'must.contain.number'
    },
    {
        name      : "includeSpecialChar",
        validator : new IncludeSpecialChar(),
        errMsg    : 'must.contain.special.char'
    },
    {
        name      : "length",
        validator : new Length(),
        errMsg    : 'must.be.between'
    },
    {
        name      : "min",
        validator : new Min(),
        errMsg    : 'must.be.min'
    },
    {
        name      : "max",
        validator : new Max(),
        errMsg    : 'must.be.max'
    },
    {
        name      : "string",
        validator : new OnlyAlpha(),
        errMsg    : 'must.be.only.string'
    },
    {
        name      : "int",
        validator : new OnlyInteger(),
        errMsg    : 'must.be.only.number'
    },
]

export default defaultValidators
