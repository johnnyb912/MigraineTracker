import {fromJS, List, Map, Record} from 'immutable';

import {PaymentStepState} from './payment-step-state.model';
import {PaymentMethodState} from './payment-method-state.model';
import {PaymentAccountState} from './payment-accounts-state.model';
import {PaymentMappingState} from './payment-mapping-state.model';
import {BillingStatementState} from '../../Statements/types/billing-statement-state.model';

/**
 * when loading the Redux state from local storage, the PaymentsState will take
 * a POJO of the following type as the parameter
 */
interface IPaymentsState {
    displayCancelPayment    : boolean;
    selectedPaymentDate     : string;
    paymentStepsState       : Array<PaymentStepState>;
    paymentMethodsState     : Array<PaymentMethodState>;
    paymentAccountsState    : Array<PaymentAccountState>;
    paymentMappingsState    : Array<PaymentMappingState>;
    activeStatements        : Array<BillingStatementState>;
}

const PAYMENTS_STATE = Record({
    displayCancelPayment    : false,
    selectedPaymentDate     : '',
    paymentStepsState       : List<PaymentStepState>(),
    paymentMethodsState     : List<PaymentMethodState>(),
    paymentAccountsState    : List<PaymentAccountState>(),
    paymentMappingsState    : List<PaymentMappingState>(),
    activeStatements        : List<BillingStatementState>()
});

/**
 * type definition for Redux Store payments state
 */
export class PaymentsState extends PAYMENTS_STATE {
    displayCancelPayment    : boolean;
    selectedPaymentDate     : string;
    paymentStepsState       : List<PaymentStepState>;
    paymentMethodsState     : List<PaymentMethodState>;
    paymentAccountsState    : List<PaymentAccountState>;
    paymentMappingsState    : List<PaymentMappingState>;
    activeStatements        : List<BillingStatementState>;

    constructor(values? : PaymentsState | IPaymentsState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentsState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // paymentStepsState
                convertedValues = convertedValues.set('paymentStepsState', List(convertedValues.get('paymentStepsState').map(value => new PaymentStepState(value))));

                // paymentMethodsState
                convertedValues = convertedValues.set('paymentMethodsState', List(convertedValues.get('paymentMethodsState').map(value => new PaymentMethodState(value))));

                // paymentAccountsState
                convertedValues = convertedValues.set('paymentAccountsState', List(convertedValues.get('paymentAccountsState').map(value => new PaymentAccountState(value))));

                // paymentMappingsState
                convertedValues = convertedValues.set('paymentMappingsState', List(convertedValues.get('paymentMappingsState').map(value => new PaymentMappingState(value))));

                // activeStatements
                convertedValues = convertedValues.set('activeStatements', List(convertedValues.get('activeStatements')));
            }
        }

        super(convertedValues);
    }
}
