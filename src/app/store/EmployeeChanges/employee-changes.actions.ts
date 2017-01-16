import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';

@Injectable()

export class EmployeeChangesActions {
    static EMPLOYEE_HIGHLIGHT_MENU_ITEM               = 'EMPLOYEE_HIGHLIGHT_MENU_ITEM';
    static EMPLOYEE_HIGHLIGHT_YEAR                    = 'EMPLOYEE_HIGHLIGHT_YEAR';
    static EMPLOYEE_HIGHLIGHT_MONTH                   = 'EMPLOYEE_HIGHLIGHT_MONTH';
    static EMPLOYEE_HIGHLIGHT_STATUS                  = 'EMPLOYEE_HIGHLIGHT_STATUS';
    static EMPLOYEE_HIGHLIGHT_COVERAGE                = 'EMPLOYEE_HIGHLIGHT_COVERAGE';
    static EMPLOYEE_HIGHLIGHT_DAY                     = 'EMPLOYEE_HIGHLIGHT_DAY';
    static EMPLOYEE_HIGHLIGHT_RECENTLY_UPDATED_TYPE   = 'EMPLOYEE_HIGHLIGHT_RECENTLY_UPDATED_TYPE';
    static EMPLOYEE_HIGHLIGHT_FILTER                  = 'EMPLOYEE_HIGHLIGHT_FILTER';
    static EMPLOYEE_HIGHLIGHT_VIEW_TYPE               = 'EMPLOYEE_HIGHLIGHT_VIEW_TYPE';

    constructor(private store : NgRedux<IAppState>) {}

    employeeChangesHighlightMenuItem(item : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_MENU_ITEM,
            payload : item
        });
    }

    employeeChangesHighlightYear(year : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_YEAR,
            payload : year
        });
    }

    employeeChangesHighlightMonth(month : string) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_MONTH,
            payload : month
        });
    }

    employeeChangesHighlightStatus(status : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_STATUS,
            payload : status
        });
    }

    employeeChangesHighlightCoverage(coverage : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_COVERAGE,
            payload : coverage
        });
    }

    employeeChangesHighlightDay(day : any) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_DAY,
            payload : day
        });
    }

    employeeChangesHighlightRecentlyUpdatedType(recentlyUpdatedType : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_RECENTLY_UPDATED_TYPE,
            payload : recentlyUpdatedType
        });
    }

    employeeChangesHighlightFilter(filterActive : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_FILTER,
            payload : filterActive
        });
    }

    employeeChangesHighlightViewType(viewTypeActive : number) {
        this.store.dispatch({
            type    : EmployeeChangesActions.EMPLOYEE_HIGHLIGHT_VIEW_TYPE,
            payload : viewTypeActive
        });
    }
}
