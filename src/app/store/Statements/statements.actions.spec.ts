import {async} from '@angular/core/testing';
import {NgRedux} from 'ng2-redux';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {StatementsActions} from './statements.actions';
import {IAppState} from '../app-store';
import {StatementsService} from '../../epics/Billing/';
import {
    IBillingStatementSummaryState,
    BillingStatementState,
    IBillingStatementExpandedState
} from './types/';

// Mock out the NgRedux class with just enough to test what we want.
class MockRedux extends NgRedux<IAppState> {
    constructor() {
        super(undefined);
    }

    dispatch = () => undefined;
}

// Mock the StatementsService with the methods we need to trigger
class MockStatementsService extends StatementsService {
    constructor() {
        super(undefined);
    }

    getStatements() {
        return Observable.create(observer => {
            // update Redux store
            observer.next(List());
        });
    }
}

describe('Statements Action Creators', () => {
    let statementsActions   : StatementsActions,
        statementsService   : StatementsService,
        mockRedux           : NgRedux<IAppState>;

    // setup tasks to perform before each test
    beforeEach(() => {
        // Initialize mock NgRedux and create a new instance of the
        // ActionCreator Service to be tested.
        mockRedux           = new MockRedux();
        statementsService   = new MockStatementsService();
        statementsActions   = new StatementsActions(mockRedux, statementsService);
    });

    // test definitions
    it('statementsGetStatements method should dispatch STATEMENTS_REFRESH action', async(() => {
        // action expected to be dispatched
        const expectedAction = {
            type    : StatementsActions.STATEMENTS_REFRESH,
            payload : List()
        };

        // spy on mock dispatch method
        spyOn(mockRedux, 'dispatch');

        statementsActions.statementsGetStatements();

        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    }));

    it('statementsRefresh method should dispatch STATEMENTS_REFRESH action', () => {
        // action expected to be dispatched
        const expectedAction = {
            type    : StatementsActions.STATEMENTS_REFRESH,
            payload : List<IBillingStatementSummaryState>()
        };

        // spy on mock dispatch method
        spyOn(mockRedux, 'dispatch');

        statementsActions.statementsRefresh(List<IBillingStatementSummaryState>());

        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('statementsUpdateActiveStatements method should dispatch STATEMENTS_UPDATE_ACTIVE_STATEMENTS action', () => {
        // action expected to be dispatched
        const expectedAction = {
            type    : StatementsActions.STATEMENTS_UPDATE_ACTIVE_STATEMENTS,
            payload : new BillingStatementState()
        };

        // spy on mock dispatch method
        spyOn(mockRedux, 'dispatch');

        statementsActions.statementsUpdateActiveStatements(new BillingStatementState());

        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('statementsPayAll method should dispatch STATEMENTS_PAY_ALL action', () => {
        // action expected to be dispatched
        const expectedAction = {
            type    : StatementsActions.STATEMENTS_PAY_ALL
        };

        // spy on mock dispatch method
        spyOn(mockRedux, 'dispatch');

        statementsActions.statementsPayAll();

        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('statementsExpandBill method should dispatch STATEMENTS_EXPAND_BILL action', () => {
        // action expected to be dispatched
        const expectedAction = {
            type    : StatementsActions.STATEMENTS_EXPAND_BILL,
            payload : <IBillingStatementExpandedState> {}
        };

        // spy on mock dispatch method
        spyOn(mockRedux, 'dispatch');

        statementsActions.statementsExpandBill(<IBillingStatementExpandedState> {});

        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    });
});
