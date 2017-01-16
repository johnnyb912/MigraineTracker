import {fromJS, Map, Record} from 'immutable';

import {BillingStatementState} from './billing-statement-state.model';

export interface IBillingStatementExpandedState {
    statement   : BillingStatementState;
    yearIndex   : number;
    itemIndex   : number;
}

export const BILLING_STATEMENT_EXPANDED_STATE = Record({
    statement   : new BillingStatementState(),
    yearIndex   : 0,
    itemIndex   : 0
});

export class BillingStatementExpandedState extends BILLING_STATEMENT_EXPANDED_STATE {
    statement   : BillingStatementState;
    yearIndex   : number;
    itemIndex   : number;

    constructor(values? : BillingStatementExpandedState | IBillingStatementExpandedState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatementExpandedState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // statement
                convertedValues = convertedValues.set('statement', new BillingStatementState(convertedValues.get('statement')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
