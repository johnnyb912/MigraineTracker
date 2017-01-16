import {fromJS, List, Map, Record} from 'immutable';

import {CardPlan} from './card-plan.model';
import {CardBilling} from './card-billing.model';
import {CardEmployee} from './card-employee.model';
import {CardClaim} from './card-claim.model';

interface IDashboardInfo {
    billing     : CardBilling;
    employee    : CardEmployee;
    claims      : CardClaim;
    plans       : Array<CardPlan>;
}

export const DASHBOARD_INFO = Record({
    billing     : new CardBilling(),
    employee    : new CardEmployee(),
    claims      : new CardClaim(),
    plans       : List<CardPlan>()
});

export class DashboardInfo extends DASHBOARD_INFO {
    billing     : CardBilling;
    employee    : CardEmployee;
    claims      : CardClaim;
    plans       : List<CardPlan>;

    constructor(values? : DashboardInfo | IDashboardInfo) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof DashboardInfo) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // billing
                convertedValues = convertedValues.set('billing', new CardBilling(convertedValues.get('billing')));

                // employee
                convertedValues = convertedValues.set('employee', new CardEmployee(convertedValues.get('employee')));

                // claims
                convertedValues = convertedValues.set('claims', new CardClaim(convertedValues.get('claims')));

                // plans
                convertedValues = convertedValues.set('plans', List(convertedValues.get('plans').map(value => new CardPlan(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
