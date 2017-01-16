import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../../../../../store/';
import {
    StatementsActions,
    StatementsState,
    BillingStatementState
} from '../../../../../store/Statements/';

@Component({
    selector        : 'statements-container',
    templateUrl     : './statements-container.component.html',
    styleUrls       : [ './statements-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of StatementsContainerComponent: main container for statements summary page
 */
export class StatementsContainerComponent {
    /**
     * StatementsContainerComponent constructor
     * @param store
     * @param router
     * @param cd
     * @param statementsActions
     */
    constructor(
        private store               : NgRedux<IAppState>,
        private router              : Router,
        private cd                  : ChangeDetectorRef,
        private statementsActions   : StatementsActions
    ) {
        // observe statements related state

        // statements state
        this.statementsStateSubscription = store.select(state => state.statementsState).subscribe(val => {
            // did we get new data?
            if (val.equals(this.statementsState) !== true) {
                // update local state
                this.statementsState = val;

                // mark the path from root of component tree to this component
                // for change detected on the next tick
                // We do this because we're set to ChangeDetectionStrategy.OnPush
                this.cd.markForCheck();
            }
        });
    }

    /**
     * Redux statements state subscription
     */
    private statementsStateSubscription : Subscription;

    /**
     * flag that triggers show/hide Statements Body full width
     * @type {boolean}
     */
    statementsBodyExpand : boolean = false;

    /**
     * current snapshot of statements state
     */
    statementsState : StatementsState;

    /**
     * required icons for display in template
     * @type {{resize: (any|T), move: (any|T)}}
     */
    icons : any = {
        message : require('images/SvgIcons/icon-message.svg'),
        minus   : require('images/SvgIcons/icon-minus.svg'),
        move    : require('images/SvgIcons/icon-move.svg'),
        plus    : require('images/SvgIcons/icon-plus.svg'),
        resize  : require('images/SvgIcons/icon-resize.svg')
    };

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
     * event handler for billing side nav component's activeStatementsUpdate event
     * @param event
     */
    onStatementSelected(event : any) {
        // update store
        this.statementsActions.statementsUpdateActiveStatements(event);
    }

    /**
     * event handler for billing section header PayAll event
     * @param event
     */
    onPayAll(event : any) {
        // update store
        this.statementsActions.statementsPayAll();

        // route to payments
        this.router.navigate(['/Billing/Payment']);
    }

    /**
     * event handler for bill expanded/unexpanded UI action
     * @param bill
     * @param summaryIndex
     * @param statementIndex
     */
    billExpanded(bill : BillingStatementState, summaryIndex : number, statementIndex : number) {
        // update store
        this.statementsActions.statementsExpandBill({
            statement   : bill,
            yearIndex   : summaryIndex,
            itemIndex   : statementIndex
        });
    }

    onDoStatementBodyExpand(isExpanded : boolean) {
        this.statementsBodyExpand = isExpanded;
    }

    /**
     * user wants to pay selected bills only
     */
    paySelected() {
        // route to payments
        this.router.navigate(['/Billing/Payment']);
    }

    /**
     * event handler for statement card save event
     * @param event statement card data
     * @param statementIndex index of this statement in the top level activeStatement collection
     * @param index index of this bill in the Self Accounting property of this activeStatement
     */
    onSaveStatementCard(event : any, statementIndex : number, index : number) {

    }

    /**
     * component lifecycle init hook
     */
    ngOnInit() {
        // check for populated state first
        if (!this.statementsState.get('statements') || this.statementsState.get('statements').size === 0) {
            // refresh dashboard data
            this.statementsActions.statementsGetStatements();
        }
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.statementsStateSubscription.unsubscribe();
    }
}
