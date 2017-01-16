import {List} from 'immutable';

import {IPayloadAction} from '../index';
import {EmployerChangesActions} from './employer-changes.actions';
import {INITIAL_EMPLOYER_CHANGES_STATE} from './employer-changes.initial-state';
import {
    CompanyState,
    EmployerChangesState,
    EmployerSideBarState,
    IPlanState,
    PlanState,
    EnumEmployerSideBarCategory,
    ICompany
} from './types';

/**
 * App Dashboard State Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const EMPLOYER_CHANGES_STATE_REDUCER = (state : EmployerChangesState = INITIAL_EMPLOYER_CHANGES_STATE, action : IPayloadAction) : EmployerChangesState => {
    switch (action.type) {
        case EmployerChangesActions.EMPLOYER_SIDEBAR_TOGGLE :
            state = state.merge(updateSidebar(action.payload, state)) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_UPDATE_CURRENT_COMPANY :
            state = state.merge({ companies : updateCurrentCompany(state, action.payload) }) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_UPDATE_CURRENT_PLAN :
            state = state.merge({ plans : updateCurrentPlan(state, action.payload) }) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_COMPANIES_REFRESH :
            state = state.merge({ companies : updateCompanies(action.payload) }) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_PLANS_REFRESH :
            state = state.merge({ plans : updatePlans(action.payload) }) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_TOGGLE_GROUP_EDIT :
            state = state.merge({ companies : groupEditing(state) }) as EmployerChangesState;

            break;
        case EmployerChangesActions.EMPLOYER_TOGGLE_ADMIN_EDIT :
            state = state.merge({ companies : adminEditing(state) }) as EmployerChangesState;

            break;
        default :
            return state;
    }

    return state;
};

/**
 * updates the companies portion of the EmployerChangesState
 * @param companies
 */
function updateCompanies(companies : Array<ICompany>) : List<CompanyState> {
    return List<CompanyState>(companies.map((value, index) => {
        // set the first company in the list as selected by default
        if (index === 0) {
            return new CompanyState(value).set('selected', true);
        }
        else {
            return new CompanyState(value);
        }
    }));
}

/**
 * updates the plans portion of the EmployerChangesState
 * @param plans
 */
function updatePlans(plans : Array<IPlanState>) : List<PlanState> {
    return List<PlanState>(plans.map((value, index) => {
        if (index === 0) {
            return new PlanState(value).set('selected', true);
        } else {
            return new PlanState(value);
        }
    }));
}

/**
 * updates the current company
 * @param state
 * @param companyName
 */
function updateCurrentCompany(state : EmployerChangesState, companyName : string) : List<CompanyState> {
    return List<CompanyState>(state.get('companies').map(company => company.set('selected', company.get('name') === companyName)));
}

/**
 * updates the current plan
 * @param state
 * @param planType
 */
function updateCurrentPlan(state : EmployerChangesState, planType : string) : List<PlanState> {
    return List<PlanState>(state.get('plans').map(plan => plan.set('selected', plan.get('type') === planType)));
}

/**
 * updates the collapsed states for sidebar
 * @param category
 * @param state
 */
function updateSidebar(category : EnumEmployerSideBarCategory, state : EmployerChangesState) : EmployerSideBarState {
    switch (category) {
        case EnumEmployerSideBarCategory.GROUPS:
            return state.setIn(['sideBarState', 'isGroupsCategoryCollapsed'], !state.getIn(['sideBarState', 'isGroupsCategoryCollapsed'])) as EmployerSideBarState;
        case EnumEmployerSideBarCategory.SUBSIDIARIES:
            return state.setIn(['sideBarState', 'isSubsidiariesCategoryCollapsed'], !state.getIn(['sideBarState', 'isSubsidiariesCategoryCollapsed'])) as EmployerSideBarState;
        case EnumEmployerSideBarCategory.PLANS:
            return state.setIn(['sideBarState', 'isPlansCategoryCollapsed'], !state.getIn(['sideBarState', 'isPlansCategoryCollapsed'])) as EmployerSideBarState;
        default :
            break;
    }
}

/**
 * updates the edit state for group section
 * @param state
 */

function groupEditing(state : EmployerChangesState) : List<CompanyState> {
    // find the currently selected company, changing isGroupEditing value to opposite
    return state.get('companies').map(value => value.get('selected') ? value.set('isGroupEditing', !value.get('isGroupEditing')) : value);
}

/**
 * updates the edit state for admin section
 * @param state
 */

function adminEditing(state : EmployerChangesState) : List<CompanyState> {
    // find the currently selected company, changing isAdminEditing value to opposite
    return state.get('companies').map(value => value.get('selected') ? value.set('isAdminEditing', !value.get('isAdminEditing')) : value);
}
