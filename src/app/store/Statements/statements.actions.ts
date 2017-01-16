import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {List} from 'immutable';

import {IAppState} from '../app-store';
import {StatementsService} from '../../epics/Billing/services';
import {
    IBillingStatementSummaryState,
    IBillingStatementExpandedState,
    BillingStatementState
} from './types/';

@Injectable()

export class StatementsActions {
    static STATEMENTS_REFRESH                     = 'STATEMENTS_REFRESH';
    static STATEMENTS_UPDATE_ACTIVE_STATEMENTS    = 'STATEMENTS_UPDATE_ACTIVE_STATEMENTS';
    static STATEMENTS_PAY_ALL                     = 'STATEMENTS_PAY_ALL';
    static STATEMENTS_EXPAND_BILL                 = 'STATEMENTS_EXPAND_BILL';

    constructor(
        private store               : NgRedux<IAppState>,
        private statementsService   : StatementsService
    ) {}

    statementsGetStatements() {
        // refresh dashboard data
        this.statementsService.getStatements().subscribe(response => {
            this.statementsRefresh(response);
        }, error => {
            this.statementsRefresh(undefined);
        });
    }

    statementsRefresh(statements : List<IBillingStatementSummaryState>) {
        this.store.dispatch({
            type    : StatementsActions.STATEMENTS_REFRESH,
            payload : statements
        });
    }

    statementsUpdateActiveStatements(statement : BillingStatementState) {
        this.store.dispatch({
            type    : StatementsActions.STATEMENTS_UPDATE_ACTIVE_STATEMENTS,
            payload : statement
        });
    }

    statementsPayAll() {
        this.store.dispatch({ type : StatementsActions.STATEMENTS_PAY_ALL });
    }

    statementsExpandBill(statement : IBillingStatementExpandedState) {
        this.store.dispatch({
            type    : StatementsActions.STATEMENTS_EXPAND_BILL,
            payload : statement
        });
    }
}
