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

const defaultValidators = {
    required               : {validator: new Required(), errMsg: 'must.not.be.empty'},
    email                  : {validator: new Email(), errMsg: 'must.be.email'},
    match                  : {validator: new Match(), errMsg: 'must.match'},
    includeCapitalLetter   : {validator: new IncludeCapitalLetter(), errMsg: 'must.contain.cap.letter'},
    includeLowercaseLetter : {validator: new IncludeLowercaseLetter(), errMsg: 'must.contain.low.letter'},
    includeNumber          : {validator: new IncludeNumber(), errMsg: 'must.contain.number'},
    includeSpecialChar     : {validator: new IncludeSpecialChar(), errMsg: 'must.contain.special.char'},
    length                 : {validator: new Length(), errMsg: 'must.be.between'},
    min                    : {validator: new Min(), errMsg: 'must.be.min'},
    max                    : {validator: new Max(), errMsg: 'must.be.max'},
    string                 : {validator: new OnlyAlpha(), errMsg: 'must.be.only.string'},
    int                    : {validator: new OnlyInteger(), errMsg: 'must.be.only.number'},
}

export default defaultValidators