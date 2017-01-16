import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {NgRedux} from 'ng2-redux';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {IAppState} from '../../../../../store/';
import {
    EnumPaymentStepType,
    PaymentActions,
    PaymentsState,
    PaymentStepState,
    PaymentMethodState,
    PaymentMappingState,
    PaymentMappingStatementState,
    IPaymentMappingSelection
} from '../../../../../store/Payments/';
import {
    StatementsState,
    BillingStatement
} from '../../../../../store/Statements/';

@Component({
    selector        : 'payment-steps',
    templateUrl     : './payment-steps.component.html',
    styleUrls       : [ './payment-steps.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsContainerComponent: main component driving payment workflow
 */
export class PaymentStepsContainerComponent {
    /**
     * PaymentStepsContainerComponent constructor
     * @param router
     * @param store
     * @param cd
     * @param paymentActions
     */
    constructor(
        private router          : Router,
        private store           : NgRedux<IAppState>,
        private cd              : ChangeDetectorRef,
        private paymentActions  : PaymentActions
    ) {
        // observe statements related state

        // statements state
        this.paymentsSubscription = this.store.select(state => state.paymentsState).subscribe(val => {
            // did we get new data?
            if (val.equals(this.paymentsState) !== true) {
                // update local state
                this.paymentsState = val;

                // mark the path from root of component tree to this component
                // for change detected on the next tick
                // We do this because we're set to ChangeDetectionStrategy.OnPush
                this.cd.markForCheck();
            }
        });

        // statements state
        this.statementsSubscription = this.store.select(state => state.statementsState).subscribe(val => {
            if (val.equals(this.statementsState) !== true) {
                // update local state
                this.statementsState = val;

                // go through the list of statements and determine which ones were selected for payment
                this.updateActiveStatements();

                // mark the path from root of component tree to this component
                // for change detected on the next tick
                // We do this because we're set to ChangeDetectionStrategy.OnPush
                this.cd.markForCheck();
            }
        });
    }

    /**
     * Redux payments state subscription
     */
    private paymentsSubscription : Subscription;

    /**
     * Redux statements state subscription
     */
    private statementsSubscription : Subscription;

    /**
     * inspects StatementsState and determines which statements are selected for payment
     */
    private updateActiveStatements() {
        let activeStatements : List<BillingStatement>;

        activeStatements = this.statementsState.get('statements').flatMap(summary => {
            // append extra properties
            return summary.get('statements').filter(item => {
                if (item.get('selected')) {
                    return item;
                }
            });
        });

        // check size of activeStatements
        if (activeStatements.size === 0) {
            // user probably navigated to Payments from the navigation menu.  Let's just select
            // all the 'Late' or 'Due' statements by default
            activeStatements = this.statementsState.get('statements').flatMap(summary => {
                // append extra properties
                return summary.get('statements').filter(item => {
                    if (item.get('status') === 'Due' || item.get('status')) {
                        return item;
                    }
                });
            });
        }

        // update store
        this.paymentActions.paymentUpdateActiveStatements(activeStatements);
    }

    /**
     * current snapshot of payments state
     */
    paymentsState : PaymentsState;

    /**
     * current snapshot of statements state
     */
    statementsState : StatementsState;

    /**
     * store computed list of selected bill statements here
     */
    activeStatements : List<BillingStatement>;

    /**
     * flag to hide/show payment success screen
     */
    showSuccessPage : boolean = false;

    /**
     * store payment type enums here
     * @type {EnumPaymentStepType}
     */
    paymentStepTypes : typeof EnumPaymentStepType = EnumPaymentStepType;

    /**
     * shows payment success page
     */
    paymentWasSuccessful() {
        this.showSuccessPage = true;

        // reset payments state for next time...
        this.paymentActions.paymentResetState();
    }

    /**
     * handler for payment step switch events from child components
     * @param step
     */
    onPaymentStepSelect(step : PaymentStepState) {
        // set payment step to payment method selection
        this.paymentActions.paymentUpdateActiveStep(step.get('type'));
    }

    /**
     * handler for payment footer back button event
     * @param step
     */
    onPaymentStepPrevious(step : any) {
        // basically we look at current state and either navigate user back one step or if they are still on
        // select payment method step we display the cancel payment prompt
        let currentStateIndex : number = this.paymentsState.get('paymentStepsState').findIndex(value => value.get('active'));

        if (currentStateIndex === EnumPaymentStepType.METHOD) {
            // dispatch action
            this.paymentActions.paymentShowCancelPayment();
        }
        else {
            // determine current active step and send user to previous step
            this.paymentActions.paymentPreviousPaymentStep();
        }
    }

    /**
     * handler for display cancel payment prompt
     * @param event
     */
    onShowCancelPayment(event : any) {
        // dispatch action
        this.paymentActions.paymentShowCancelPayment();
    }

    /**
     * handler for payment footer cancel event
     * @param event
     */
    onCancelPaymentAction(event : boolean) {
        // dispatch action
        this.paymentActions.paymentCancelPayment(event);

        if (event) {
            // reset payments state for next time...
            this.paymentActions.paymentResetState();

            // navigate back to Statements
            this.router.navigate(['/Billing']);
        }
    }

    /**
     * event handler for payment selection event
     * @param event
     */
    onPaymentMethodSelected(event : PaymentMethodState) {
        // update store with selected payment method
        this.paymentActions.paymentUpdatePaymentMethod(event.type);

        // set the completed flag for this step
        this.paymentActions.paymentUpdateCompletedStep(EnumPaymentStepType.METHOD);

        // navigate to next step
        this.paymentActions.paymentUpdateActiveStep(EnumPaymentStepType.ACCOUNT);
    }

    /**
     * event handler for payments account completed event
     * @param event
     */
    onAccountsCompleted(event : any) {
        // set the completed flag for this step
        this.paymentActions.paymentUpdateCompletedStep(EnumPaymentStepType.ACCOUNT);

        // payments account Next button was clicked
        this.paymentActions.paymentUpdateActiveStep(EnumPaymentStepType.AMOUNT);
    }

    /**
     * event handler for payment account expanded/collapse event
     * on payment account step
     * @param event
     */
    onAccountExpanded(event : PaymentMappingState) {
        // dispatch action
        this.paymentActions.paymentExpandPaymentAccount(event);
    }

    /**
     * event handler for payment amounts editing event
     * @param event
     */
    onEditingStatement(event : PaymentMappingStatementState) {
        // dispatch action
        this.paymentActions.paymentAmountEdit(event);
    }

    /**
     * event handler for payment account selection event
     * @param event
     */
    onPaymentSelectionsUpdated(event : IPaymentMappingSelection) {
        // update store
        this.paymentActions.paymentUpdatePaymentMapping(event);
    }

    /**
     * event handler for payment amounts edited event
     * @param event
     */
    onPaymentAmountsUpdated(event : PaymentMappingStatementState) {
        // dispatch action
        this.paymentActions.paymentAmountEdit(event);
    }

    /**
     * event handler for payments amount completed event
     * @param event
     */
    onAmountsCompleted(event : any) {
        // set the completed flag for this step
        this.paymentActions.paymentUpdateCompletedStep(EnumPaymentStepType.AMOUNT);

        // payments amount confirm Next button was clicked
        this.paymentActions.paymentUpdateActiveStep(EnumPaymentStepType.REVIEW);
    }

    /**
     * payment date selected event handler
     * @param event
     */
    onPaymentDateSelected(event : string) {
        // update store
        this.paymentActions.paymentUpdatePaymentDate(event);
    }

    /**
     * payment review method edit icon click event handler
     * @param account
     */
    onPaymentMethodEdit(account : any) {
        // send user to payment accounts step
        this.paymentActions.paymentUpdateActiveStep(EnumPaymentStepType.ACCOUNT);
    }

    /**
     * payment submit event handler
     * @param event
     */
    onSubmitPayment(event : any) {
        this.showSuccessPage = true;

        // reset payments state for next time...
        this.paymentActions.paymentResetState();
    }

    /**
     * component lifecycle init hook
     */
    ngOnInit() {
        // retrieve user's payment accounts??
        if (this.paymentsState.get('paymentAccountsState').size === 0) {
            this.paymentActions.paymentGetPaymentAccounts();
        }

        // init payment state?
        if (this.paymentsState.get('paymentStepsState').size === 0 || this.paymentsState.get('paymentMethodsState').size === 0) {
            this.paymentActions.paymentInitState();
        }
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.paymentsSubscription.unsubscribe();
        this.statementsSubscription.unsubscribe();

        // reset payments state for next time...
        this.paymentActions.paymentResetState();
    }
}
