import {fromJS, Map, Record} from 'immutable';

interface IBillingStatementTotalsState {
    totalDue                : number;
    selectedTotal           : number;
    dueDate                 : string;
    numSelected             : number;
    displayPaymentButton    : boolean;
}

export const BILLING_STATEMENT_TOTALS_STATE = Record({
    totalDue                : 0,
    selectedTotal           : 0,
    dueDate                 : '',
    numSelected             : 0,
    displayPaymentButton    : false
});

export class BillingStatementTotalsState extends BILLING_STATEMENT_TOTALS_STATE {
    totalDue                : number;
    selectedTotal           : number;
    dueDate                 : string;
    numSelected             : number;
    displayPaymentButton    : boolean;

    constructor(values? : BillingStatementTotalsState | IBillingStatementTotalsState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatementTotalsState) {
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
