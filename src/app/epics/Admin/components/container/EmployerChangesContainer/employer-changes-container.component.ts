import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {Subscription} from 'rxjs/Subscription';

import {IAppState} from '../../../../../store/';
import {
    EmployerChangesActions,
    EmployerChangesState,
    CompanyState,
    EnumEmployerSideBarCategory
} from '../../../../../store/EmployerChanges/';

@Component({
    selector        : 'employer-changes',
    templateUrl     : './employer-changes-container.component.html',
    styleUrls       : [ './employer-changes-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerChangesContainerComponent; responsible for employer changes layout
 */
export class EmployerChangesContainerComponent {
    /**
     * EmployerChangesContainerComponent constructor
     * @param store
     * @param cd
     * @param employerChangesActions
     */
    constructor(
        private store                   : NgRedux<IAppState>,
        private cd                      : ChangeDetectorRef,
        private employerChangesActions  : EmployerChangesActions
    ) {
        // employer changes state
        this.employerChangesSubscription = this.store.select(state => state.employerChangesState).subscribe(val => {
            // did we get new data?
            if (val.equals(this.employerChangesState) !== true) {
                // update local state
                this.employerChangesState = val;

                // mark the path from root of component tree to this component
                // for change detected on the next tick
                // We do this because we're set to ChangeDetectionStrategy.OnPush
                this.cd.markForCheck();
            }

            if (this.employerChangesState.get('companies').size > 0) {
                // getting current company name
                this.currentCompanyName = this.employerChangesState.get('companies').find(company => company.get('selected')).get('name');
            }

            if (this.employerChangesState.get('plans').size > 0) {
                // getting current plan type
                this.currentPlanType = this.employerChangesState.get('plans').find(plan => plan.get('selected')).get('type');
            }
        });
    }

    /**
     * Redux employer changes state subscription
     */
    private employerChangesSubscription : Subscription;

    /**
     * current snapshot of employer changes state
     */
    employerChangesState : EmployerChangesState;

    /**
     * data to show on change card
     */
    changeCard : Array<string> = [
        'GROUP',
        'SUBSIDIARY',
        'PLAN'
    ];

    /**
     * current company name
     */
    currentCompanyName :  string;

    /**
     * current plan type
     */
    currentPlanType :  string;

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @param obj
     * @returns {number}
     */
    static trackByIndex(index : number, obj : any) : any {
        return index;
    }

    /**
     * handles enable/disable of form group card
     *
     */
    onUpdateFormStateGroup() {
        this.employerChangesActions.employerChangesToggleGroupEdit();
    }

    /**
     * handles enable/disable of form administrator card
     *
     */
    onUpdateFormStateAdmin() {
        this.employerChangesActions.employerChangesToggleAdminEdit();
    }

    /**
     * updating current company name
     *
     */
    onUpdateCompanyName(name : string) {
        this.employerChangesActions.employerChangesUpdateCurrentCompany(name);
    }

    /**
     * updating current plan type
     *
     */
    onUpdatePlanType(type : string) {
        this.employerChangesActions.employerChangesUpdateCurrentPlan(type);
    }

    /**
     * event handler for on updated card information event
     * @param event the updated information for the card
     */
    onUpdateCompanyInfo(event : CompanyState) {

    }

    /**
     * collapsing sidebar section
     *
     */
    onToggleExpanded(name : EnumEmployerSideBarCategory) {
        this.employerChangesActions.employerChangesSidebarToggle(EnumEmployerSideBarCategory[name]);
    }

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // check for populated state first
        if (!this.employerChangesState.get('companies') || this.employerChangesState.get('companies').size === 0) {
            // refresh companies data
            this.employerChangesActions.employerGetCompanies();
        }

        if (!this.employerChangesState.get('plans') || this.employerChangesState.get('plans').size === 0) {
            // refresh plans data
            this.employerChangesActions.employerGetPlans();
        }
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.employerChangesSubscription.unsubscribe();
    }
}
