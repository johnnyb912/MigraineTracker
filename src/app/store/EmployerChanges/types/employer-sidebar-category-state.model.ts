import {fromJS, Map, Record} from 'immutable';

interface IEmployerSideBarState {
    isGroupsCategoryCollapsed        : boolean;
    isSubsidiariesCategoryCollapsed  : boolean;
    isPlansCategoryCollapsed         : boolean;
}

export const EMPLOYER_SIDEBAR_STATE = Record({
    isGroupsCategoryCollapsed        : false,
    isSubsidiariesCategoryCollapsed  : false,
    isPlansCategoryCollapsed         : false
});

export class EmployerSideBarState extends EMPLOYER_SIDEBAR_STATE {
    isGroupsCategoryCollapsed        : boolean;
    isSubsidiariesCategoryCollapsed  : boolean;
    isPlansCategoryCollapsed         : boolean;

    constructor(values? : EmployerSideBarState | IEmployerSideBarState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof EmployerSideBarState) {
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
