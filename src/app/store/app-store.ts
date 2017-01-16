import {combineReducers} from 'redux';
import {fromJS, Map, Record} from 'immutable';

import {
    USER_STATE_REDUCER,
    UserState
} from './User';
import {
    NAV_STATE_REDUCER,
    NavState
} from './Navigation';
import {
    DASHBOARD_STATE_REDUCER,
    DashboardState
} from './Dashboard';
import {
    STATEMENTS_STATE_REDUCER,
    StatementsState
} from './Statements';
import {
    PAYMENTS_STATE_REDUCER,
    PaymentsState
} from './Payments';
import {
    EMPLOYER_CHANGES_STATE_REDUCER,
    EmployerChangesState
} from './EmployerChanges';
import {
    EMPLOYEE_CHANGES_STATE_REDUCER,
    EmployeeChangesState
} from './EmployeeChanges';

export interface IAppState {
    userState?              : UserState;
    navState?               : NavState;
    dashboardState?         : DashboardState;
    statementsState?        : StatementsState;
    paymentsState?          : PaymentsState;
    employerChangesState?   : EmployerChangesState;
    employeeChangesState?   : EmployeeChangesState;
}

const APP_STATE = Record({
    userState               : new UserState(),
    navState                : new NavState(),
    dashboardState          : new DashboardState(),
    statementsState         : new StatementsState(),
    paymentsState           : new PaymentsState(),
    employerChangesState    : new EmployerChangesState(),
    employeeChangesState    : new EmployeeChangesState()
});

export class AppState extends APP_STATE {
    userState?              : UserState;
    navState?               : NavState;
    dashboardState?         : DashboardState;
    statementsState?        : StatementsState;
    paymentsState?          : PaymentsState;
    employerChangesState?   : EmployerChangesState;
    employeeChangesState?   : EmployeeChangesState;

    constructor(values? : AppState | IAppState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof AppState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // userState
                convertedValues = convertedValues.set('userState', new UserState(convertedValues.get('userState')));

                // activeNavState
                convertedValues = convertedValues.set('navState', new NavState(convertedValues.get('navState')));

                // dashboardState
                convertedValues = convertedValues.set('dashboardState', new DashboardState(convertedValues.get('dashboardState')));

                // statementsState
                convertedValues = convertedValues.set('statementsState', new StatementsState(convertedValues.get('statementsState')));

                // paymentsState
                convertedValues = convertedValues.set('paymentsState', new PaymentsState(convertedValues.get('paymentsState')));

                // employerChangesState
                convertedValues = convertedValues.set('employerChangesState', new EmployerChangesState(convertedValues.get('employerChangesState')));

                // employeeChangesState
                convertedValues = convertedValues.set('employeeChangesState', new EmployeeChangesState(convertedValues.get('employeeChangesState')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}

export const ROOT_REDUCER = combineReducers<IAppState>({
    userState               : USER_STATE_REDUCER,
    navState                : NAV_STATE_REDUCER,
    dashboardState          : DASHBOARD_STATE_REDUCER,
    statementsState         : STATEMENTS_STATE_REDUCER,
    paymentsState           : PAYMENTS_STATE_REDUCER,
    employerChangesState    : EMPLOYER_CHANGES_STATE_REDUCER,
    employeeChangesState    : EMPLOYEE_CHANGES_STATE_REDUCER
});

export function deimmutify(store : IAppState) {
    return {
        userState               : store.userState.toJS(),
        navState                : store.navState.toJS(),
        dashboardState          : store.dashboardState.toJS(),
        statementsState         : store.statementsState.toJS(),
        paymentsState           : store.paymentsState.toJS(),
        employerChangesState    : store.employerChangesState.toJS(),
        employeeChangesState    : store.employeeChangesState.toJS()
    };
}

export function reimmutify(POJO : any) {
    try {
        return {
            userState               : new UserState(POJO.userState),
            navState                : new NavState(POJO.activeNavState),
            dashboardState          : new DashboardState(POJO.dashboard),
            statementsState         : new StatementsState(POJO.statementsState),
            paymentsState           : new PaymentsState(POJO.paymentsState),
            employerChangesState    : new EmployerChangesState(POJO.employerChangesState),
            employeeChangesState    : new EmployeeChangesState(POJO.employeeChangesState)
        };
    }
    catch (err) {

    }
}
