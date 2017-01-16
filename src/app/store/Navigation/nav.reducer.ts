import {INITIAL_NAV_STATE} from './nav.initial-state';
import {NavState} from './types';
import {IPayloadAction} from '../index';
import {NavActions} from './navigation.actions';

/**
 * APP NAVIGATION STORE
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const NAV_STATE_REDUCER = (state : NavState = INITIAL_NAV_STATE, action : IPayloadAction) : NavState => {
    switch (action.type) {
        case NavActions.UPDATE_NAV :
            state = state.merge({ activeNavState : action.payload }) as NavState;

            break;
        default :
            return state;
    }

    return state;
};
