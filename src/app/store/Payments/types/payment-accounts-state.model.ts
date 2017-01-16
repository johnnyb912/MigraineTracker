import {fromJS, Map, Record} from 'immutable';

interface IPaymentAccountState {
    accountName : string;
    accountMask : string;
}

export const PAYMENT_ACCOUNT_STATE = Record({
    accountName : '',
    accountMask : ''
});

export class PaymentAccountState extends PAYMENT_ACCOUNT_STATE {
    accountName : string;
    accountMask : string;

    constructor(values? : PaymentAccountState | IPaymentAccountState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentAccountState) {
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
