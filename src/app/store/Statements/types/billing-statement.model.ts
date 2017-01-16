import {fromJS, List, Map, Record} from 'immutable';

import {BillingSummary} from './billing-summary.model';

interface IBillingStatement {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : Array<BillingSummary>;
    employeeListBill?       : Array<BillingSummary>;
}

export const BILLING_STATEMENT = Record({
    statementId            : '',
    month                  : '',
    monthShort             : '',
    status                 : '',
    amount                 : 0,
    billingPeriod          : '',
    dueDate                : '',
    selfAccounting         : List<BillingSummary>(),
    employeeListBill       : List<BillingSummary>()
});

export class BillingStatement extends BILLING_STATEMENT {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : List<BillingSummary>;
    employeeListBill?       : List<BillingSummary>;

    constructor(values? : BillingStatement | IBillingStatement) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof BillingStatement) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

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
