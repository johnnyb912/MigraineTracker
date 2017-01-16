import {fromJS, Map, Record} from 'immutable';

export interface IPlanState {
    type        : string;
    amount      : number;
    employees   : number;
    selected    : boolean;
}

export const PLAN_STATE = Record({
    type        : '',
    amount      : 0,
    employees   : 0,
    selected    : false
});

export class PlanState extends PLAN_STATE {
    type        : string;
    amount      : number;
    employees   : number;
    selected    : boolean;

    constructor(values? : PlanState | IPlanState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof PlanState) {
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
