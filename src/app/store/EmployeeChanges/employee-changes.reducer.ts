import {INITIAL_EMPLOYEE_CHANGES_STATE} from './employee-changes.initial-state';
import {EmployeeChangesState} from './types';
import {IPayloadAction} from '../index';
import {EmployeeChangesActions} from './employee-changes.actions';

/**
 * App Dashboard State Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const EMPLOYEE_CHANGES_STATE_REDUCER = (state : EmployeeChangesState = INITIAL_EMPLOYEE_CHANGES_STATE, action : IPayloadAction) : EmployeeChangesState => {
    switch (action.type) {
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_MENU_ITEM :
            state = updateTopMenu(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_YEAR :
            state = updateYear(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_MONTH :
            state = updateMonth(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_STATUS :
            state = updateStatus(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_COVERAGE :
            state = updateCoverage(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_DAY :
            state = updateDay(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_RECENTLY_UPDATED_TYPE :
            state = updateRecentlyUpdatedType(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_FILTER :
            state = updateFilter(state, action.payload) as EmployeeChangesState;

            break;
        case EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_VIEW_TYPE :
            state = updateViewType(state, action.payload) as EmployeeChangesState;

            break;
        default :
            return state;
    }

    return state;
};

/**
 * updates the top menu current item of the EmployeeChangesState
 * @param state
 * @param key
 */
function updateTopMenu(state : EmployeeChangesState, key : number) : EmployeeChangesState {
    return state.set('topMenuActive', key) as EmployeeChangesState;
}

/**
 * updates the year of the EmployeeChangesState
 * @param state
 * @param year
 */
function updateYear(state : EmployeeChangesState, year : number) : EmployeeChangesState {
    return state.set('yearActive', year) as EmployeeChangesState;
}

/**
 * updates the month of the EmployeeChangesState
 * @param state
 * @param month
 */
function updateMonth(state : EmployeeChangesState, month : string) : EmployeeChangesState {
    return state.set('monthActive', month) as EmployeeChangesState;
}

/**
 * updates the status of the EmployeeChangesState
 * @param state
 * @param key
 */
function updateStatus(state : EmployeeChangesState, key : number) : EmployeeChangesState {
    return state.set('statusActive', key) as EmployeeChangesState;
}

/**
 * updates the coverage of the EmployeeChangesState
 * @param state
 * @param key
 */
function updateCoverage(state : EmployeeChangesState, key : number) : EmployeeChangesState {
    return state.set('coverageActive', key) as EmployeeChangesState;
}

/**
 * updates the day of the EmployeeChangesState
 * @param state
 * @param day
 */
function updateDay(state : EmployeeChangesState, day : number) : EmployeeChangesState {
    return state.set('dayActive', day) as EmployeeChangesState;
}

/**
 * updates the recently updated type of the EmployeeChangesState
 * @param state
 * @param key
 */
function updateRecentlyUpdatedType(state : EmployeeChangesState, key : string) : EmployeeChangesState {
    return state.set('recentlyUpdatedTypeActive', key) as EmployeeChangesState;
}

/**
 * updates the filter of the EmployeeChangesState
 * @param state
 * @param filter
 */
function updateFilter(state : EmployeeChangesState, filter : string) : EmployeeChangesState {
    return state.set('filterActive', filter) as EmployeeChangesState;
}

/**
 * updates the view type of the EmployeeChangesState
 * @param state
 * @param key
 */
function updateViewType(state : EmployeeChangesState, key : string) : EmployeeChangesState {
    return state.set('viewTypeActive', key) as EmployeeChangesState;
}
