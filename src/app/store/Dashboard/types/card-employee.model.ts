import {fromJS, Map, Record} from 'immutable';

interface ICardEmployee {
    dayOfWeekUpdate : string;
    numEmployees    : string;
}

export const CARD_EMPLOYEE = Record({
    dayOfWeekUpdate : '',
    numEmployees    : ''
});

export class CardEmployee extends CARD_EMPLOYEE {
    dayOfWeekUpdate : string;
    numEmployees    : string;

    constructor(values? : CardEmployee | ICardEmployee) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CardEmployee) {
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
