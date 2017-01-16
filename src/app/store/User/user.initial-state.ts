import {List} from 'immutable';

import {
    UserState,
    DecisionGroupOption
} from './types';

export const INITIAL_USER_STATE = new UserState().withMutations(state => {
    state.setIn(['userProfile', 'contactPreferenceOptions'], List([
        {
            label   : 'Email',
            checked : false
        },
        {
            label   : 'Paper Mail',
            checked : false
        },
        {
            label   : 'Text',
            checked : false
        }
    ]).map(value => new DecisionGroupOption(value)));
}) as UserState;
