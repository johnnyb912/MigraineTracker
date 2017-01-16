import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs/Observable';

import {IAppState} from '../../../../../store/';
import {
    EnumCardStatusType,
    DashboardActions,
    DashboardStateSelectors,
    DashboardInfo
} from '../../../../../store/Dashboard/';
import {
    StatementsActions,
    StatementsState
} from '../../../../../store/Statements/';

@Component({
    selector        : 'dashboard-body-container',
    templateUrl     : './dashboard-body-container.component.html',
    styleUrls       : [ './dashboard-body-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation for DashboardBodyContainerComponent: handles display of dashboard status cards
 */
export class DashboardBodyContainerComponent {
    /**
     *
     * @param dashboardActions
     * @param statementsActions
     * @param store
     * @param cd
     * @param dashboardSelectors
     */
    constructor(
        private dashboardActions    : DashboardActions,
        private statementsActions   : StatementsActions,
        private store               : NgRedux<IAppState>,
        private cd                  : ChangeDetectorRef,
        private dashboardSelectors  : DashboardStateSelectors
    ) {
        // observe dashboard state
        this.dashboardSubscription = Observable.combineLatest(
            this.dashboardSelectors.dashboardInfo(),
            this.store.select(state => state.statementsState))
        .subscribe(val => {
            this.dashboard          = val[0];
            this.statementsState    = val[1];

            this.cd.markForCheck();
        });
    }

    /**
     * Redux state subscription
     */
    private dashboardSubscription : Subscription;

    /**
     * current snapshot of dashboard state
     */
    dashboard : DashboardInfo;

    /**
     * current snapshot of statements state
     */
    statementsState : StatementsState;

    /**
     * enum with possible card status types
     */
    cardTypes : typeof EnumCardStatusType = EnumCardStatusType;

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
     * component init lifecycle hook
     */
    ngOnInit() {
        // refresh dashboard data
        this.dashboardActions.dashboardGetDashboard();

        // check for statements data
        if (!this.statementsState.get('statements')) {
            // refresh dashboard data
            this.statementsActions.statementsGetStatements();
        }
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.dashboardSubscription.unsubscribe();
    }
}
