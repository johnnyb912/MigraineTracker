import {fromJS, Map, Record} from 'immutable';

import {EnumNavOption} from './nav-option.model';

interface INavState {
    activeNavState : EnumNavOption;
}

export const NAV_STATE = Record({
    activeNavState : EnumNavOption.LOGIN
});

/**
 * type definition for Redux Store navigation state
 */
export class NavState extends NAV_STATE {
    activeNavState : EnumNavOption;

    constructor(values? : NavState | INavState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof NavState) {
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
