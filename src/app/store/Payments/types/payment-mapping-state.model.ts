import {fromJS, List, Map, Record} from 'immutable';

import {PaymentAccountState} from './payment-accounts-state.model';
import {PaymentMappingStatementState} from './payment-mapping-statement-state.model';

interface IPaymentMappingState {
    paymentAccount      : PaymentAccountState;
    selectedStatements  : Array<PaymentMappingStatementState>;
    expanded            : boolean;
}

export const PAYMENT_MAPPING_STATE = Record({
    paymentAccount      : new PaymentAccountState(),
    selectedStatements  : List<PaymentMappingStatementState>(),
    expanded            : false
});

export class PaymentMappingState extends PAYMENT_MAPPING_STATE {
    paymentAccount      : PaymentAccountState;
    selectedStatements  : List<PaymentMappingStatementState>;
    expanded            : boolean;

    constructor(values? : PaymentMappingState | IPaymentMappingState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentMappingState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // paymentAccount
                convertedValues = convertedValues.set('paymentAccount', new PaymentAccountState(convertedValues.get('paymentAccount')));

                // selectedStatements
                convertedValues = convertedValues.set('selectedStatements', List(convertedValues.get('selectedStatements').map(value => new PaymentMappingStatementState(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
