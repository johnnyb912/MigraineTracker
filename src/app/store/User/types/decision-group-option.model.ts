import {fromJS, Map, Record} from 'immutable';

interface IDecisionGroupOption {
    label   : string;
    checked : boolean;
}

export const DECISION_GROUP_OPTION = Record({
    label   : '',
    checked : false
});

export class DecisionGroupOption extends DECISION_GROUP_OPTION {
    label   : string;
    checked : boolean;

    constructor(values? : DecisionGroupOption | IDecisionGroupOption) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof DecisionGroupOption) {
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
