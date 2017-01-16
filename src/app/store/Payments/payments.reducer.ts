import {List} from 'immutable';
import * as moment from 'moment';

import {INITIAL_PAYMENTS_STATE} from './payments.initial-state';
import {BillingStatementState} from '../Statements/';
import {IPayloadAction} from '../index';
import {PaymentActions} from './payment.actions';
import {
    PaymentsState,
    PaymentStepState,
    EnumPaymentStepType,
    PaymentMethodState,
    EnumPaymentMethodType,
    PaymentAccountState,
    PaymentMappingState,
    IPaymentMappingSelection,
    PaymentMappingStatementState
} from './types';

/**
 * App Dashboard State Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const PAYMENTS_STATE_REDUCER = (state : PaymentsState = INITIAL_PAYMENTS_STATE, action : IPayloadAction) : PaymentsState => {
    switch (action.type) {
        case PaymentActions.PAYMENT_RESET_STATE :
            // wipe out state
            state = state.merge({
                displayCancelPayment    : false,
                selectedPaymentDate     : '',
                paymentStepsState       : List<PaymentStepState>(),
                paymentMethodsState     : List<PaymentMethodState>(),
                paymentAccountsState    : List<PaymentAccountState>(),
                paymentMappingsState    : List<PaymentMappingState>(),
                activeStatements        : List<BillingStatementState>()
            }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_INIT_STATE :
            // initialize payment steps state, setting payment method screen to active
            let paymentSteps : List<PaymentStepState> = List([
                    new PaymentStepState({
                        type        : EnumPaymentStepType.METHOD,
                        active      : true,
                        completed   : false
                    }),
                    new PaymentStepState({
                        type        : EnumPaymentStepType.ACCOUNT,
                        active      : false,
                        completed   : false
                    }),
                    new PaymentStepState({
                        type        : EnumPaymentStepType.AMOUNT,
                        active      : false,
                        completed   : false
                    }),
                    new PaymentStepState({
                        type        : EnumPaymentStepType.REVIEW,
                        active      : false,
                        completed   : false
                    })
                ]),

                // initialize payment method selections
                paymentMethods : List<PaymentMethodState> = List([
                    new PaymentMethodState({
                        type        : EnumPaymentMethodType.BANK_DRAFT,
                        label       : 'Bank Account',
                        code        : 0,
                        selected    : false
                    }),
                    new PaymentMethodState({
                        type        : EnumPaymentMethodType.CHECK,
                        label       : 'Send a Check',
                        code        : 1,
                        selected    : false
                    })
                ]);

            state = state.merge({ paymentStepsState : paymentSteps }) as PaymentsState;

            state = state.merge({ paymentMethodsState : paymentMethods }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_ACCOUNTS :
            // first update available payment accounts
            state = state.merge({ paymentAccountsState : updatePaymentAccounts(action.payload) }) as PaymentsState;

            // now populate our payment mappings with these accounts
            state = state.merge({ paymentMappingsState : updatePaymentMappingAccounts(state, action.payload)}) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_ACTIVE_STATEMENTS :
            state = state.merge({ activeStatements : updateActiveStatements(action.payload) }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_PAYMENT_METHOD :
            state = state.merge({ paymentMethodsState : updateSelectedPaymentMethod(state, action.payload) }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_ACTIVE_STEP :
            state = state.merge({ paymentStepsState : updatePaymentStepActive(state, action.payload) }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_COMPLETED_STEP :
            state = state.merge({ paymentStepsState : updatePaymentStepComplete(state, action.payload) }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_PAYMENT_MAPPING :
            // now populate our payment mappings with these accounts
            state = state.merge({ paymentMappingsState : updatePaymentMappingSelection(state, action.payload)}) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_EXPAND_PAYMENT_ACCOUNT :
            // update paymentMappings with expanded state of this payment account
            state = state.merge({ paymentMappingsState : updatePaymentMappingExpanded(state, action.payload)}) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_UPDATE_PAYMENT_DATE : {
            let selectedDate;

            if (moment(action.payload).isSame(moment(), 'day')) {
                selectedDate = 'Today';
            }
            else if (moment(action.payload).diff(moment(), 'day') === 0) {
                selectedDate = 'Tomorrow';
            }
            else {
                selectedDate = action.payload;
            }

            state = state.merge({ selectedPaymentDate : selectedDate }) as PaymentsState;

            break;
        }
        case PaymentActions.PAYMENT_AMOUNT_EDIT :
            // update paymentMappings with expanded state of this statement's payment amount
            state = state.merge({ paymentMappingsState : updatePaymentMappingAmountEditing(state, action.payload)}) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_PREVIOUS_STEP :
            // determine if user can navigate back or not
            state = state.merge({ paymentStepsState : updatePaymentStepPrevious(state) }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_CANCEL_PAYMENT :
            state = state.merge({ displayCancelPayment : false }) as PaymentsState;

            break;
        case PaymentActions.PAYMENT_SHOW_CANCEL_PAYMENT :
            state = state.merge({ displayCancelPayment : true }) as PaymentsState;

            break;
        default :
            return state;
    }

    return state;
};

/**
 * modify currently selected payment step based on latest payment step user has selected
 * and previously completion state of whichever state they are currently on
 * @param state
 * @param paymentStep
 */
function updatePaymentStepActive(state : PaymentsState, paymentStep : EnumPaymentStepType) : List<PaymentStepState> {
    // user is allowed to move freely between payment steps EXCEPT when they haven't selected a payment method
    // so check for the payment method selection first before we go any further
    let paymentMethodSelected = state.paymentMethodsState.filter(item => {
        return item.selected;
    });

    // has a payment method been selected or not??
    if (paymentMethodSelected.size > 0) {
        // update paymentsStepsState to reflect current active payment step
        return state.paymentStepsState.map(item => item.get('type') === paymentStep ? item.set('active', true) : item.set('active', false)) as List<PaymentStepState>;
    }
    else {
        // return current state
        return state.paymentStepsState;
    }
}

/**
 * attempts to navigate one step back in payments workflow
 * @param state
 */
function updatePaymentStepPrevious(state : PaymentsState) : List<PaymentStepState> {
    // basically we look at current state and either navigate user back one step or if they are still on
    // select payment method step we display the cancel payment prompt
    let currentStateIndex : number = state.get('paymentStepsState').findIndex(value => value.get('active'));

    if (currentStateIndex === EnumPaymentStepType.METHOD) {
        // need to display cancel prompt
        return state.get('paymentStepsState');
    }
    else {
        // set previous state active
        return state.get('paymentStepsState').update(currentStateIndex, element => element.set('active', false)).update(currentStateIndex - 1, element => element.set('active', true));
    }
}

/**
 * modify completed state of the payment step passed in as parameter
 * @param state
 * @param paymentStep
 */
function updatePaymentStepComplete(state : PaymentsState, paymentStep : EnumPaymentStepType) : List<PaymentStepState> {
    // update completed values of paymentStep
    return state.paymentStepsState.map(item => item.get('type') === paymentStep ? item.set('completed', true) : item.set('completed', item.get('completed'))) as List<PaymentStepState>;
}

/**
 * updates PaymentMethodState to reflect current chosen payment method
 * @param state
 * @param paymentMethod
 */
function updateSelectedPaymentMethod(state : PaymentsState, paymentMethod : EnumPaymentMethodType) : List<PaymentMethodState> {
    return state.paymentMethodsState.map(item => item.get('type') === paymentMethod ? item.set('selected', true) : item.set('selected', false)) as List<PaymentMethodState>;
}

/**
 * updates PaymentAccountState with data returned from getPaymentAccounts service call
 * @param paymentAccounts
 */
function updatePaymentAccounts(paymentAccounts : List<PaymentAccountState>) : List<PaymentAccountState> {
    return List<PaymentAccountState>(paymentAccounts.map(value => new PaymentAccountState(value)));
}

/**
 * updates PaymentAccountState with data returned from getPaymentAccounts service call
 * @param statements
 */
function updateActiveStatements(statements : List<BillingStatementState>) : List<BillingStatementState> {
    return List(statements);
}

/**
 * populate the 'paymentAccount' property of each PaymentMappingState Record in our PaymentState Redux store
 * @param state
 * @param paymentAccounts
 * @returns {List<T>|List<any>|List<PaymentMappingState>|any}
 */
function updatePaymentMappingAccounts(state : PaymentsState, paymentAccounts : List<PaymentAccountState>) : List<PaymentMappingState> {
    return List<PaymentMappingState>(paymentAccounts.map(item => new PaymentMappingState({
        paymentAccount      : new PaymentAccountState(item),
        selectedStatements  : state.get('activeStatements'),
        expanded            : false
    })));
}

/**
 * modify the 'expanded' property of the supplied payment account based on user interaction with
 * the payment accounts step of the payments workflow
 * @param state
 * @param paymentMapping
 */
function updatePaymentMappingExpanded(state : PaymentsState, paymentMapping : PaymentMappingState) : List<PaymentMappingState> {
    return state.get('paymentMappingsState').map(value => {
        // find matching payment account
        if (value.getIn(['paymentAccount', 'accountName']) === paymentMapping.getIn(['paymentAccount', 'accountName'])) {
            // update expanded property
            return value.set('expanded', !value.get('expanded'));
        }
        else {
            return value;
        }
    });
}

/**
 * modified a given payment mapping state with a new assignment of a bill to a payment account
 * @param state
 * @param selection
 */
function updatePaymentMappingSelection(state : PaymentsState, selection : IPaymentMappingSelection) : List<PaymentMappingState> {
    return state.get('paymentMappingsState').map(value => {
        // find matching payment account
        if (value.getIn(['paymentAccount', 'accountName']) === selection.account.getIn(['paymentAccount', 'accountName'])) {
            // find the selected statement match
            return value.set('selectedStatements', value.get('selectedStatements').map(statement => {
                if (statement.get('monthShort') === selection.selection.get('label')) {
                    // update the checked property
                    return statement.set('checked', selection.selection.get('checked'));
                }
                else {
                    return statement;
                }
            }));
        }
        else {
            return value;
        }
    });
}

/**
 * modifies a selected statements editing status on Payment Amount step of payment workflow
 * @param state
 * @param amount
 */
function updatePaymentMappingAmountEditing(state : PaymentsState, amount : PaymentMappingStatementState) : List<PaymentMappingState> {
    let accountIndex : number = 0,
        statementIndex : number = 0;

    state.get('paymentMappingsState').forEach((value, valueIndex) => {
        // find matching statement
        value.get('selectedStatements').forEach((item, itemIndex) => {
            if (item.get('statementId') === amount.get('statementId') && item.get('checked')) {
                accountIndex    = valueIndex;
                statementIndex  = itemIndex;
            }
        });
    });

    return state.get('paymentMappingsState').updateIn([accountIndex, 'selectedStatements', statementIndex], element => element.set('isEditingAmount', !element.get('isEditingAmount')));
}
