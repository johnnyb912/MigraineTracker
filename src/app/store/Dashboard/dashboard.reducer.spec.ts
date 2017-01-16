import {List} from 'immutable';

import {INITIAL_DASHBOARD_STATE} from './dashboard.initial-state';
import {DASHBOARD_STATE_REDUCER} from './dashboard.reducer';
import {DashboardInfo} from './types/dashboard-info.model';
import {DashboardActions} from './dashboard.actions';

describe('Dashboard State Reducer', () => {
    it('should init initial state', () => {
        expect(
            DASHBOARD_STATE_REDUCER(undefined, {
                type    : undefined,
                payload : undefined
            })
        )
        .toEqual(INITIAL_DASHBOARD_STATE);
    });

    it('should handle DASHBOARD_BANNER_COLLAPSED action', () => {
        expect(
            DASHBOARD_STATE_REDUCER(undefined, {
                type    : DashboardActions.DASHBOARD_BANNER_COLLAPSED,
                payload : false
            })
            .get('bannerCollapsed')
        )
        .toEqual(false);
    });

    it('should handle DASHBOARD_REFRESH action', () => {
        expect(
            DASHBOARD_STATE_REDUCER(undefined, {
                type    : DashboardActions.DASHBOARD_REFRESH,
                payload : new DashboardInfo()
            })
            .get('dashboard')
        )
        .toEqual(new DashboardInfo());
    });

    it('should handle MESSAGES_REFRESH action', () => {
        expect(
            DASHBOARD_STATE_REDUCER(undefined, {
                type    : DashboardActions.MESSAGES_REFRESH,
                payload : List()
            })
            .get('messages')
        )
        .toEqual(List());
    });
});
