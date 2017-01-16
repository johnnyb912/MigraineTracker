import {fromJS, Map, Record} from 'immutable';

import {EnumPaymentStepType} from './payment-step-type.model';

interface IPaymentStepState {
    type        : EnumPaymentStepType;
    active      : boolean;
    completed   : boolean;
}

export const PAYMENT_STEP_STATE = Record({
    type        : EnumPaymentStepType.METHOD,
    active      : false,
    completed   : false
});

export class PaymentStepState extends PAYMENT_STEP_STATE {
    type        : EnumPaymentStepType;
    active      : boolean;
    completed   : boolean;

    constructor(values? : PaymentStepState | IPaymentStepState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentStepState) {
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
