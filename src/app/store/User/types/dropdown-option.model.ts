import {fromJS, Map, Record} from 'immutable';

export interface IDropdownOption {
    id    : number;
    value : string;
}

const DROPDOWN_OPTION = Record({
    id    : 0,
    value : ''
});

export class DropdownOption extends DROPDOWN_OPTION {
    id    : number;
    value : string;

    constructor(values? : DropdownOption | IDropdownOption) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof DropdownOption) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);
            }
        }

        super(convertedValues);
    }
}
