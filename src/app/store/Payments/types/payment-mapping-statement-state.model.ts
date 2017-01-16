import {fromJS, List, Map, Record} from 'immutable';
import {BillingSummary} from '../../Statements/types/billing-summary.model';
import {BillingStatement} from '../../Statements/types/billing-statement.model';

interface IPaymentMappingStatementStateBase {
    label           : string;
    checked         : boolean;
    isEditingAmount : boolean;
}

export const PAYMENT_MAPPING_STATEMENT_STATE_BASE = Record({
    label           : '',
    checked         : false,
    isEditingAmount : false
});

export class PaymentMappingStatementStateBase extends PAYMENT_MAPPING_STATEMENT_STATE_BASE {
    label           : string;
    checked         : boolean;
    isEditingAmount : boolean;

    constructor(values? : PaymentMappingStatementStateBase | IPaymentMappingStatementStateBase) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentMappingStatementState) {
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

interface IPaymentMappingStatementState {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : Array<BillingSummary>;
    employeeListBill?       : Array<BillingSummary>;
    label                   : string;
    checked                 : boolean;
    isEditingAmount         : boolean;
}

export const PAYMENT_MAPPING_STATEMENT_STATE = Record({
    statementId             : '',
    month                   : '',
    monthShort              : '',
    status                  : '',
    amount                  : 0,
    billingPeriod           : '',
    dueDate                 : '',
    selfAccounting          : List<BillingSummary>(),
    employeeListBill        : List<BillingSummary>(),
    label                   : '',
    checked                 : false,
    isEditingAmount         : false
});

export class PaymentMappingStatementState extends PAYMENT_MAPPING_STATEMENT_STATE {
    statementId             : string;
    month?                  : string;
    monthShort              : string;
    status                  : string;
    amount                  : number;
    billingPeriod?          : string;
    dueDate?                : string;
    selfAccounting?         : List<BillingSummary>;
    employeeListBill?       : List<BillingSummary>;
    label                   : string;
    checked                 : boolean;
    isEditingAmount         : boolean;

    constructor(values? : PaymentMappingStatementState | IPaymentMappingStatementState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PaymentMappingStatementState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // create combination type
                convertedValues = extend(new PaymentMappingStatementStateBase(values), new BillingStatement(values));

                // label
                convertedValues = convertedValues.set('label', convertedValues.get('monthShort'));

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

function extend<T extends PaymentMappingStatementStateBase, U extends BillingStatement>(first : T, second : U) : T & U {
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
