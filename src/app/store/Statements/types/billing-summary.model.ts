import {fromJS, Map, Record} from 'immutable';

interface IBillingSummary {
    type        : string;
    coverage    : string;
    premium     : number;
    employees   : number;
    adjustments : number;
    total       : number;
    rate        : number;
}

export const BILLING_SUMMARY = Record({
    type        : '',
    coverage    : '',
    premium     : 0,
    employees   : 0,
    adjustments : 0,
    total       : 0,
    rate        : 0
});

export class BillingSummary extends BILLING_SUMMARY {
    type        : string;
    coverage    : string;
    premium     : number;
    employees   : number;
    adjustments : number;
    total       : number;
    rate        : number;

    constructor(values? : BillingSummary | IBillingSummary) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingSummary) {
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
