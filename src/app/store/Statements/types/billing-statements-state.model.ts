import {fromJS, List, Map, Record} from 'immutable';

import {BillingStatementSummaryState} from './billing-statement-summary-state.model';
import {BillingStatementTotalsState} from './billing-statement-totals-state.model';

interface IStatementsState {
    statements  : Array<BillingStatementSummaryState>;
    stateTotals : BillingStatementTotalsState;
}

export const STATEMENTS_STATE = Record({
    statements  : List<BillingStatementSummaryState>(),
    stateTotals : new BillingStatementTotalsState()
});

/**
 * type definition for Redux Store statements state
 */
export class StatementsState extends STATEMENTS_STATE {
    statements  : List<BillingStatementSummaryState>;
    stateTotals : BillingStatementTotalsState;

    constructor(values? : StatementsState | IStatementsState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof StatementsState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // statements
                convertedValues = convertedValues.set('statements', List(convertedValues.get('statements').map(value => new BillingStatementSummaryState(value))));

                // stateTotals
                convertedValues = convertedValues.set('stateTotals', new BillingStatementTotalsState(convertedValues.get('stateTotals')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
