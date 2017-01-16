import {fromJS, Map, Record} from 'immutable';

import {CardBillingLastPayment} from './card-billing-last-payment.model';

interface ICardBilling {
    dueDate     : string;
    dueAmount   : string;
    lastPayment : CardBillingLastPayment;
}

export const CARD_BILLING = Record({
    dueDate     : '',
    dueAmount   : '',
    lastPayment : new CardBillingLastPayment()
});

export class CardBilling extends CARD_BILLING {
    dueDate     : string;
    dueAmount   : string;
    lastPayment : CardBillingLastPayment;

    constructor(values? : CardBilling | ICardBilling) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CardBilling) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // lastPayment
                convertedValues = convertedValues.set('lastPayment', new CardBillingLastPayment(convertedValues.get('lastPayment')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
