import {fromJS, List, Map, Record} from 'immutable';

import {CompanyState} from './company-state.model';
import {PlanState} from './plan-state.model';
import {EmployerSideBarState} from './employer-sidebar-category-state.model';

interface IEmployerChangesState {
    isSearchExpanded        : boolean;
    sideBarState            : EmployerSideBarState;
    companies               : Array<CompanyState>;
    plans                   : Array<PlanState>;
}

export const EMPLOYER_CHANGES_STATE = Record({
    isSearchExpanded        : false,
    sideBarState            : new EmployerSideBarState(),
    companies               : List<CompanyState>(),
    plans                   : List<PlanState>()
});

export class EmployerChangesState extends EMPLOYER_CHANGES_STATE {
    isSearchExpanded        : boolean;
    sideBarState            : EmployerSideBarState;
    companies               : List<CompanyState>;
    plans                   : List<PlanState>;

    constructor(values? : EmployerChangesState | IEmployerChangesState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof EmployerChangesState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // sideBarState
                convertedValues = convertedValues.set('sideBarState', new EmployerSideBarState(convertedValues.get('sideBarState')));

                // companies
                convertedValues = convertedValues.set('companies', List(convertedValues.get('companies').map(value => new CompanyState(value))));

                // plans
                convertedValues = convertedValues.set('plans', List(convertedValues.get('plans').map(value => new PlanState(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
