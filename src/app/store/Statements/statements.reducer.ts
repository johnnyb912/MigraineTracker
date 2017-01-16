import {List} from 'immutable';
import * as _isUndefined from 'lodash/isUndefined';
import * as _add from 'lodash/add';
import * as _round from 'lodash/round';
import * as _toNumber from 'lodash/toNumber';

import {IPayloadAction} from '../index';
import {StatementsActions} from './statements.actions';
import {INITIAL_STATEMENTS_STATE} from './statements.initial-state';
import {
    StatementsState,
    BillingStatementSummaryState,
    IBillingStatementSummaryState,
    BillingStatementState,
    BillingStatementTotalsState,
    BillingStatementExpandedState
} from './types';

/**
 * App Dashboard State Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const STATEMENTS_STATE_REDUCER = (state : StatementsState = INITIAL_STATEMENTS_STATE, action : IPayloadAction) : StatementsState => {
    switch (action.type) {
        case StatementsActions.STATEMENTS_REFRESH :
        {
            // NOTE: when this action triggers an initial load of statements data has occurred, and as such,
            // we need to make some assumptions about what the currently selected active statements are
            // specifically, any statements that have a status of 'Late' or 'Due' should be automatically selected

            // update statements collection
            state = state.merge({ statements : updateStatements(action.payload) }) as StatementsState;

            // update state totals
            state = state.merge({ stateTotals : calculateStateTotals(state) }) as StatementsState;

            break;
        }
        case StatementsActions.STATEMENTS_UPDATE_ACTIVE_STATEMENTS :
        {
            // update statements collection
            state = state.merge({ statements : updateSelectedStatements(state, action.payload) }) as StatementsState;

            // update state totals
            state = state.merge({ stateTotals : calculateStateTotals(state) }) as StatementsState;

            break;
        }
        case StatementsActions.STATEMENTS_EXPAND_BILL :
            // update active statements
            state = state.merge({ statements : updateExpandedState(state, action.payload) }) as StatementsState;

            break;
        case StatementsActions.STATEMENTS_PAY_ALL :
        {
            // we need to look at active statements here and make sure it's populated
            // with every available bill that is Late or Due, not just what the user selected
            state = state.merge({ statements : payAllStatements(state) }) as StatementsState;

            break;
        }
        default :
            return state;
    }

    return state;
};

/**
 * updates the current list of statements, essentially combining model data returned from an api with any UI related state data
 * we need to capture as well
 * @param statements
 */
function updateStatements(statements : List<IBillingStatementSummaryState>) : List<BillingStatementSummaryState> {
    // create immutable version of our new model data
    return List<BillingStatementSummaryState>(statements.map(value => new BillingStatementSummaryState(value)).map((summary) => {
        // need to set any statements that are 'Late' or 'Due' to selected true by default
        return summary.set('statements', summary.get('statements').map(item => {
            if (item.get('status') === 'Due' || item.get('status') === 'Late') {
                return item.set('selected', true).set('expanded', true);
            }
            else {
                return item;
            }
        }));
    }));
}

/**
 * updates the current list of selected active statements.  This func will either assign values to the activeStatements
 * collection based on
 * @param state
 * @param newStatement
 * @returns {List<BillingStatementState>}
 */
function updateSelectedStatements(state : StatementsState, newStatement : BillingStatementState) : List<BillingStatementSummaryState> {
    // is this a multiselect scenario i.e. are we dealing with a new statement that is 'Late' or 'Due'
    if (newStatement.get('status') === 'Late' || newStatement.get('status') === 'Due') {
        // we need to inspect any previously selected statements first.  If any of the previously selected statements
        // were statements that have a status of either 'Paid' or 'Pending' then we need to unselect these
        // If any of the previously selected statements have a status of 'Late' or 'Due' we leave these selected
        // as the user is allowed to select multiple unpaid statements at the same time for payment
        return state.get('statements').map((summary) => summary.set('statements', summary.get('statements').map(item => {
            // look for exact match between the statement selected and the current item
            if (newStatement.equals(item)) {
                // if this item is already selected previously then we need to deselect it
                if (item.get('selected')) {
                    return item.set('selected', false);
                }
                else {
                    return item.set('selected', true);
                }
            }
            else {
                // the current item is not the statement that was selected but we should still examine this item
                // to see if it was previously selected or not

                // was this statement previously selected
                if (item.get('selected')) {
                    // check this item's status, if it is not 'Late' or 'Due' we need to deselect it
                    if (item.get('status') !== 'Late' && item.get('status') !== 'Due') {
                        return item.set('selected', false);
                    }
                    else {
                        // so it's possible that the user has already selected multiple statements for payment
                        // and is now trying to unselect one of the previously selected ones so let's check for that here
                        /*if (item.get('selected')) {
                         return item.set('selected', false);
                         }
                         else {*/
                        return item;
                        // }
                    }
                }
                else {
                    return item;
                }
            }
        })));
    }
    else {
        // single select, wipe out all previously selected
        return state.get('statements').map((summary) => summary.set('statements', summary.get('statements').map(item => {
            // is the statement that was selected?
            if (newStatement.get('statementId') === item.get('statementId')) {
                return item.set('selected', true);
            }
            else {
                return item.set('selected', false);
            }
        })));
    }
}

/**
 * examine statements and figure out totals and due date for selected statements
 * @param state
 * @returns {number}
 */
function calculateStateTotals(state : StatementsState) : BillingStatementTotalsState {
    let stateTotals : BillingStatementTotalsState = new BillingStatementTotalsState({
            totalDue                : 0,
            selectedTotal           : 0,
            dueDate                 : undefined,
            numSelected             : 0,
            displayPaymentButton    : false
        }),

        numSelected : number = 0;

    state.get('statements').forEach((item) => {
        item.get('statements').forEach((stuff) => {
            // totalDue is based on late or due statements
            if (stuff.get('status') === 'Late' || stuff.get('status') === 'Due') {
                // update total amount due
                stateTotals = stateTotals.set('totalDue', stateTotals.get('totalDue') + _round(_add(_toNumber(stuff.get('amount'))), 2)) as BillingStatementTotalsState;
            }

            // selected total is based on selected statements
            if (stuff.get('selected')) {
                // update selected total
                stateTotals = stateTotals.set('selectedTotal', stateTotals.get('selectedTotal') + _round(_add(_toNumber(stuff.get('amount'))), 2)) as BillingStatementTotalsState;

                // does the selected item also have a status of 'Late' or 'Due' ??
                if (stuff.get('status') === 'Late' || stuff.get('status') === 'Due') {
                    // update payment button display state
                    stateTotals = stateTotals.set('displayPaymentButton', true) as BillingStatementTotalsState;
                }

                // increment number of selected items
                numSelected++;
            }
        });
    });

    // due date depends on selected statements
    if (numSelected === 0) {
        stateTotals = stateTotals.set('dueDate', undefined) as BillingStatementTotalsState;
    }
    // if there's only one statement then that's the due date
    else if (numSelected === 1) {
        let result = undefined;

        // search for lone selected statement
        state.get('statements').find(year => {
            year.get('statements').find(value => {
                if (value.get('selected')) {
                    result = value.get('dueDate');
                }
            });
        });

        // did we find it?
        if (!_isUndefined(result)) {
            // store its due date
            stateTotals = stateTotals.set('dueDate', result) as BillingStatementTotalsState;
        }
        else {
            // no active statements
            stateTotals = stateTotals.set('dueDate', undefined) as BillingStatementTotalsState;
        }
    }
    // if there's more than one, whichever one is LATE is the due date
    else if (numSelected > 1) {
        state.get('statements').forEach((item) => {
            let result = item.get('statements').find(value => {
                return value.get('status') === 'Late';
            });

            // if we found a match and the dueDate is not already previously defined...
            if (!_isUndefined(result) && !stateTotals.dueDate) {
                // update due date with the date of the LATE bill
                stateTotals = stateTotals.set('dueDate', result.get('dueDate')) as BillingStatementTotalsState;
            }
        });
    }

    // store # of currently selected bills
    stateTotals = stateTotals.set('numSelected', numSelected) as BillingStatementTotalsState;

    return stateTotals;
}

/**
 * updates the current list of statements, essentially combining model data returned from an api with any UI related state data
 * we need to capture as well
 * @param statements
 */
function payAllStatements(statements : StatementsState) : List<BillingStatementSummaryState> {
    // now let's update the statements property of our object with any UI related state properties we care about
    return statements.get('statements').map(summary => summary.set('statements', summary.get('statements').map(item => {
        if (item.get('status') === 'Due' || item.get('status') === 'Late') {
            return item.set('selected', true).set('expanded', true);
        }
        else {
            return item.set('selected', false).set('expanded', false);
        }
    })));
}

/**
 * updates the expanded state property of a given bill in the activeStatements slice of the statements state
 * @param state
 * @param expandedState
 */
function updateExpandedState(state : StatementsState, expandedState : BillingStatementExpandedState) : List<BillingStatementSummaryState> {
    // we know the selected indices of this statement so drill down and use an update on it to flip the 'expanded' property
    return state.get('statements').updateIn([expandedState.yearIndex, 'statements', expandedState.itemIndex], element => element.set('expanded', !expandedState.statement.get('expanded')) );
}
