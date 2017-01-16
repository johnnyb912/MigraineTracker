import {fromJS, Map, Record} from 'immutable';

interface ICardClaim {
    claimsFiled         : number;
    claimsEvaluating    : number;
    claimsProcessing    : number;
}

export const CARD_CLAIM = Record({
    claimsFiled         : 0,
    claimsEvaluating    : 0,
    claimsProcessing    : 0
});

export class CardClaim extends CARD_CLAIM {
    claimsFiled         : number;
    claimsEvaluating    : number;
    claimsProcessing    : number;

    constructor(values? : CardClaim | ICardClaim) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CardClaim) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
