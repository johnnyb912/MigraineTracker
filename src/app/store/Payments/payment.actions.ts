import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {List} from 'immutable';

import {IAppState} from '../app-store';
import {PaymentsService} from '../../epics/Billing/services';
import {BillingStatement} from '../Statements/';
import {
    EnumPaymentStepType,
    EnumPaymentMethodType,
    IPaymentMappingSelection,
    PaymentAccountState,
    PaymentMappingStatementState,
    PaymentMappingState
} from './types/';

@Injectable()

export class PaymentActions {
    static PAYMENT_INIT_STATE                 = 'PAYMENT_INIT_STATE';
    static PAYMENT_RESET_STATE                = 'PAYMENT_RESET_STATE';
    static PAYMENT_UPDATE_ACCOUNTS            = 'PAYMENT_UPDATE_ACCOUNTS';
    static PAYMENT_UPDATE_ACTIVE_STATEMENTS   = 'PAYMENT_UPDATE_ACTIVE_STATEMENTS';
    static PAYMENT_UPDATE_ACTIVE_STEP         = 'PAYMENT_UPDATE_ACTIVE_STEP';
    static PAYMENT_PREVIOUS_STEP              = 'PAYMENT_PREVIOUS_STEP';
    static PAYMENT_UPDATE_COMPLETED_STEP      = 'PAYMENT_UPDATE_COMPLETED_STEP';
    static PAYMENT_UPDATE_PAYMENT_METHOD      = 'PAYMENT_UPDATE_PAYMENT_METHOD';
    static PAYMENT_UPDATE_PAYMENT_MAPPING     = 'PAYMENT_UPDATE_PAYMENT_MAPPING';
    static PAYMENT_UPDATE_PAYMENT_DATE        = 'PAYMENT_UPDATE_PAYMENT_DATE';
    static PAYMENT_EXPAND_PAYMENT_ACCOUNT     = 'PAYMENT_EXPAND_PAYMENT_ACCOUNT';
    static PAYMENT_AMOUNT_EDIT                = 'PAYMENT_AMOUNT_EDIT';
    static PAYMENT_CANCEL_PAYMENT             = 'PAYMENT_CANCEL_PAYMENT';
    static PAYMENT_SHOW_CANCEL_PAYMENT        = 'PAYMENT_SHOW_CANCEL_PAYMENT';

    constructor(
        private store           : NgRedux<IAppState>,
        private paymentsService : PaymentsService
    ) {}

    paymentGetPaymentAccounts() {
        this.paymentsService.getPaymentAccounts().subscribe(response => {
            this.paymentUpdateAccounts(response);
        }, error => {
            this.paymentUpdateAccounts(undefined);
        });
    }

    paymentUpdateAccounts(accounts : List<PaymentAccountState>) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_ACCOUNTS,
            payload : accounts
        });
    }

    paymentUpdateActiveStatements(activeStatements : List<BillingStatement>) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_ACTIVE_STATEMENTS,
            payload : activeStatements
        });
    }

    paymentResetState() {
        this.store.dispatch({ type : PaymentActions.PAYMENT_RESET_STATE });
    }

    paymentInitState() {
        this.store.dispatch({ type : PaymentActions.PAYMENT_INIT_STATE });
    }

    paymentUpdateActiveStep(activeStep : EnumPaymentStepType) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_ACTIVE_STEP,
            payload : activeStep
        });
    }

    paymentShowCancelPayment() {
        this.store.dispatch({ type : PaymentActions.PAYMENT_SHOW_CANCEL_PAYMENT });
    }

    paymentPreviousPaymentStep() {
        this.store.dispatch({ type : PaymentActions.PAYMENT_PREVIOUS_STEP });
    }

    paymentCancelPayment(cancel : boolean) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_CANCEL_PAYMENT,
            payload : cancel
        });
    }

    paymentUpdatePaymentMethod(method : EnumPaymentMethodType) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_PAYMENT_METHOD,
            payload : method
        });
    }

    paymentUpdateCompletedStep(step : EnumPaymentStepType) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_COMPLETED_STEP,
            payload : step
        });
    }

    paymentAmountEdit(amounts : PaymentMappingStatementState) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_AMOUNT_EDIT,
            payload : amounts
        });
    }

    paymentUpdatePaymentDate(dateValue : string) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_PAYMENT_DATE,
            payload : dateValue
        });
    }

    paymentUpdatePaymentMapping(mapping : IPaymentMappingSelection) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_UPDATE_PAYMENT_MAPPING,
            payload : mapping
        });
    }

    paymentExpandPaymentAccount(account : PaymentMappingState) {
        this.store.dispatch({
            type    : PaymentActions.PAYMENT_EXPAND_PAYMENT_ACCOUNT,
            payload : account
        });
    }
}
