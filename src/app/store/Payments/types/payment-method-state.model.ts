import {fromJS, Map, Record} from 'immutable';

import {EnumPaymentMethodType} from './payment-method-type.model';

interface IPaymentMethodState {
    type        : EnumPaymentMethodType;
    label       : string;
    code        : number;
    selected    : boolean;
}

export const PAYMENT_METHOD_STATE = Record({
    type        : EnumPaymentMethodType.BANK_DRAFT,
    label       : '',
    code        : 0,
    selected    : false
});

export class PaymentMethodState extends PAYMENT_METHOD_STATE {
    type        : EnumPaymentMethodType;
    label       : string;
    code        : number;
    selected    : boolean;

    constructor(values? : PaymentMethodState | IPaymentMethodState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentMethodState) {
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
