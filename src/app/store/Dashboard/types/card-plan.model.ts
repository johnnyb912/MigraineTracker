import {fromJS, Map, Record} from 'immutable';

interface ICardPlan {
    planType    : string;
    amountMonth : string;
    numCoverage : string;
}

export const CARD_PLAN = Record({
    planType    : '',
    amountMonth : '',
    numCoverage : ''
});

export class CardPlan extends CARD_PLAN {
    planType    : string;
    amountMonth : string;
    numCoverage : string;

    constructor(values? : CardPlan | ICardPlan) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CardPlan) {
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
