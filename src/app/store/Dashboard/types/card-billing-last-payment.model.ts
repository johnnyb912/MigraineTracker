import {fromJS, Map, Record} from 'immutable';

interface ICardBillingLastPayment {
    paymentAmount   : string;
    paymentDate     : string;
}

export const CARD_BILLING_LAST_PAYMENT = Record({
    paymentAmount   : '',
    paymentDate     : ''
});

export class CardBillingLastPayment extends CARD_BILLING_LAST_PAYMENT {
    paymentAmount   : string;
    paymentDate     : string;

    constructor(values? : CardBillingLastPayment | ICardBillingLastPayment) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CardBillingLastPayment) {
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
