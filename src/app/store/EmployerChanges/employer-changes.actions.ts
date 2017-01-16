import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {EmployerService} from '../../epics/Admin/services';
import {
    ICompany,
    IPlanState
} from './types/';

@Injectable()

export class EmployerChangesActions {
    static EMPLOYER_COMPANIES_REFRESH             = 'EMPLOYER_COMPANIES_REFRESH';
    static EMPLOYER_PLANS_REFRESH                 = 'EMPLOYER_PLANS_REFRESH';
    static EMPLOYER_SIDEBAR_TOGGLE                = 'EMPLOYER_SIDEBAR_TOGGLE';
    static EMPLOYER_UPDATE_CURRENT_COMPANY        = 'EMPLOYER_UPDATE_CURRENT_COMPANY';
    static EMPLOYER_UPDATE_CURRENT_PLAN           = 'EMPLOYER_UPDATE_CURRENT_PLAN';
    static EMPLOYER_TOGGLE_GROUP_EDIT             = 'EMPLOYER_TOGGLE_GROUP_EDIT';
    static EMPLOYER_TOGGLE_ADMIN_EDIT             = 'EMPLOYER_TOGGLE_ADMIN_EDIT';

    constructor(
        private store           : NgRedux<IAppState>,
        private employerService : EmployerService
    ) {}

    employerGetCompanies() {
        this.employerService.getCompanies().subscribe(response => {
            this.employerChangesCompaniesRefresh(response);
        }, error => {
            this.employerChangesCompaniesRefresh(error);
        });
    }

    employerGetPlans() {
        this.employerService.getPlans().subscribe(response => {
            this.employerChangesPlansRefresh(response);
        }, error => {
            this.employerChangesPlansRefresh(error);
        });
    }

    employerChangesCompaniesRefresh(companies? : Array<ICompany>) {
        this.store.dispatch({
            type    : EmployerChangesActions.EMPLOYER_COMPANIES_REFRESH,
            payload : companies
        });
    }

    employerChangesPlansRefresh(plans? : Array<IPlanState>) {
        this.store.dispatch({
            type    : EmployerChangesActions.EMPLOYER_PLANS_REFRESH,
            payload : plans
        });
    }

    employerChangesToggleGroupEdit() {
        this.store.dispatch({ type : EmployerChangesActions.EMPLOYER_TOGGLE_GROUP_EDIT });
    }

    employerChangesToggleAdminEdit() {
        this.store.dispatch({ type : EmployerChangesActions.EMPLOYER_TOGGLE_ADMIN_EDIT });
    }

    employerChangesUpdateCurrentCompany(company : string) {
        this.store.dispatch({
            type    : EmployerChangesActions.EMPLOYER_UPDATE_CURRENT_COMPANY,
            payload : company
        });
    }

    employerChangesUpdateCurrentPlan(plan : string) {
        this.store.dispatch({
            type    : EmployerChangesActions.EMPLOYER_UPDATE_CURRENT_PLAN,
            payload : plan
        });
    }

    employerChangesSidebarToggle(value : string) {
        this.store.dispatch({
            type    : EmployerChangesActions.EMPLOYER_SIDEBAR_TOGGLE,
            payload : value
        });
    }
}
