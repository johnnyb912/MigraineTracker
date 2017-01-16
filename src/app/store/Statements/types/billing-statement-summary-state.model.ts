import {fromJS, List, Map, Record} from 'immutable';

import {BillingStatementState} from './billing-statement-state.model';

export interface IBillingStatementSummaryState {
    statementYear   : string;
    statements      : Array<BillingStatementState>;
}

export const BILLING_STATEMENT_SUMMARY_STATE = Record({
    statementYear   : '',
    statements      : List<BillingStatementState>()
});

export class BillingStatementSummaryState extends BILLING_STATEMENT_SUMMARY_STATE {
    statementYear   : string;
    statements      : List<BillingStatementState>;

    constructor(values? : BillingStatementSummaryState | IBillingStatementSummaryState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatementSummaryState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // statements
                convertedValues = convertedValues.set('statements', List(convertedValues.get('statements').map(value => new BillingStatementState(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
