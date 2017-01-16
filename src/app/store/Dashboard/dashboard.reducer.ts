import {INITIAL_DASHBOARD_STATE} from './dashboard.initial-state';
import {IPayloadAction} from '../index';
import {DashboardActions} from './dashboard.actions';
import {
    DashboardState,
    CarouselMessage
} from './types';

/**
 * App Dashboard State Reducer
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const DASHBOARD_STATE_REDUCER = (state : DashboardState = INITIAL_DASHBOARD_STATE, action : IPayloadAction) : DashboardState => {
    switch (action.type) {
        case DashboardActions.DASHBOARD_BANNER_COLLAPSED :
            state = state.merge({ bannerCollapsed : action.payload }) as DashboardState;

            break;
        case DashboardActions.DASHBOARD_REFRESH :
            state = state.mergeDeep({ dashboard : action.payload }) as DashboardState;

            break;
        case DashboardActions.MESSAGES_REFRESH : {
            // update messages and be sure to convert each message to proper immutable Record type
            state = state.merge({ messages : action.payload.map(value => new CarouselMessage(value)) }) as DashboardState;

            break;
        }
        default:
            return state;
    }

    return state;
};
