import {fromJS, List, Map, Record} from 'immutable';

import {BillingSummary} from './billing-summary.model';
import {BillingStatement} from './billing-statement.model';

interface IBillingStatementStateBase {
    selected        : boolean;
    expanded        : boolean;
    isEditingAmount : boolean;
}

export const BILLING_STATEMENT_STATE_BASE = Record({
    selected        : false,
    expanded        : false,
    isEditingAmount : false
});

export class BillingStatementStateBase extends BILLING_STATEMENT_STATE_BASE {
    selected        : boolean;
    expanded        : boolean;
    isEditingAmount : boolean;

    constructor(values? : BillingStatementStateBase | IBillingStatementStateBase) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatementState) {
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

interface IBillingStatementState {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : Array<BillingSummary>;
    employeeListBill?       : Array<BillingSummary>;
    selected                : boolean;
    expanded                : boolean;
    isEditingAmount         : boolean;
}

export const BILLING_STATEMENT_STATE = Record({
    statementId             : '',
    month                   : '',
    monthShort              : '',
    status                  : '',
    amount                  : 0,
    billingPeriod           : '',
    dueDate                 : '',
    selfAccounting          : List<BillingSummary>(),
    employeeListBill        : List<BillingSummary>(),
    selected                : false,
    expanded                : false,
    isEditingAmount         : false
});

export class BillingStatementState extends BILLING_STATEMENT_STATE {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : List<BillingSummary>;
    employeeListBill?       : List<BillingSummary>;
    selected                : boolean;
    expanded                : boolean;
    isEditingAmount         : boolean;

    constructor(values? : BillingStatementState | IBillingStatementState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatementState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // create combination type
                convertedValues = extend(new BillingStatementStateBase(values), new BillingStatement(values));

                // selfAccounting
                if (convertedValues.get('selfAccounting')) {
                    convertedValues = convertedValues.set('selfAccounting', List(convertedValues.get('selfAccounting').map(value => new BillingSummary(value))));
                }

                // employeeListBill
                if (convertedValues.get('employeeListBill')) {
                    convertedValues = convertedValues.set('employeeListBill', List(convertedValues.get('employeeListBill').map(value => new BillingSummary(value))));
                }
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}

function extend<T extends BillingStatementStateBase, U extends BillingStatement>(first : T, second : U) : T & U {
    let result = <T & U> {};

    for (let id in first.toJS()) {
        if (!first.hasOwnProperty(id)) {
            (<any> result)[id] = (<any> first)[id];
        }
    }

    for (let id in second.toJS()) {
        if (!result.hasOwnProperty(id)) {
            (<any> result)[id] = (<any> second)[id];
        }
    }

    return fromJS(result);
}
