import {List} from 'immutable';

import {INITIAL_USER_STATE} from './user.initial-state';
import {
    DecisionGroupOption,
    UserState,
    UserInfoState,
    UserProfileState,
    IUserInfoState
} from './types';
import {UserActions} from './user.actions';
import {IPayloadAction} from '../index';

/**
 * APP USER STORE
 *
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
export const USER_STATE_REDUCER = (state : UserState = INITIAL_USER_STATE, action : IPayloadAction) : UserState => {
    switch (action.type) {
        case UserActions.USER_LOGIN_SUCCESS :
            state = state.merge({ userAuthenticated : true }) as UserState;

            break;
        case UserActions.USER_LOGIN_FAILED :
            state = state.merge({ userAuthenticated : false }) as UserState;

            break;
        case UserActions.USER_LOGOUT :
            state = state.merge({ userAuthenticated : false }) as UserState;

            break;
        case UserActions.USER_RESET_PW_SUCCESS :
            state = state.merge({ userPasswordReset : true }) as UserState;

            break;
        case UserActions.USER_RESET_PW_FAILED :
            state = state.merge({ userPasswordReset : false }) as UserState;

            break;
        case UserActions.USER_UPDATE :
            // update UI state of editing flag
            state = state.merge({ userProfile : updatePersonalInfoEditingState(state, false) }) as UserState;

            // update user info
            state = state.merge({ userInfo : updateUserInfo(action.payload) }) as UserState;

            // update user profile state (mainly just worried about contact preferences here)
            state = state.merge({ userProfile : updateProfile(state) }) as UserState;

            break;
        case UserActions.USER_UPDATE_COM_PREF :
            // update user's selected communication preferences
            state = state.merge({ userInfo : updateUserComPreferences(state, action.payload) }) as UserState;

            // update user profile state (mainly just worried about contact preferences here)
            state = state.merge({ userProfile : updateProfile(state, action.payload) }) as UserState;

            break;
        case UserActions.USER_TOGGLE_COM_PREF :
            state = state.merge({ userProfile : updateComPreferencesToggleState(state) }) as UserState;

            break;
        case UserActions.USER_TOGGLE_PERSONAL :
            state = state.merge({ userProfile : updatePersonalInfoToggleState(state) }) as UserState;

            break;
        case UserActions.USER_UPDATE_EDITING :
            // update UI state of editing flag
            state = state.merge({ userProfile : updatePersonalInfoEditingState(state, action.payload) }) as UserState;

            // if editing was enabled, backup form data
            if (state.getIn(['userProfile', 'personalInfoEditing'])) {
                // backup user info
                state = state.merge({ userInfoBackup : updateUserBackup(state) }) as UserState;
            }
            else {
                // copy backed up data over to user info
                state = state.set('userInfo', state.get('userInfoBackup')) as UserState;

                // null backed up data
                state = state.set('userInfoBackup', new UserInfoState()) as UserState;
            }

            break;
        case UserActions.USER_UPDATE_USER_FIELD :
            state = state.setIn(['userInfo', action.payload.fieldName], action.payload.fieldValue) as UserState;

            break;
        default :
            return state;
    }

    return state;
};

/**
 * updates the userInfo property on UserState with new data
 * @param userInfo
 */
function updateUserInfo(userInfo : IUserInfoState) : UserInfoState {
    return new UserInfoState(userInfo);
}

/**
 * updates the userInfoBackup property on UserState with new data
 * @param state
 */
function updateUserBackup(state : UserState) : UserInfoState {
    return new UserInfoState(state.get('userInfo'));
}

/**
 * inspects the UserInfoState object to determine the logged in user's communication preference settings
 * then uses this data to map the selected/unselected state of the Communication Preference decision group picker
 * control located at the bottom of the User Profile screen
 * @param state
 * @param selection
 * @returns {UserProfileState}
 */
function updateProfile(state : UserState, selection? : DecisionGroupOption) : UserProfileState {
    let profileState : UserProfileState = state.get('userProfile'),
        preferences  : List<string>     = state.get('userInfo').get('contactPreference');

    if (selection) {
        return profileState.set('contactPreferenceOptions', profileState.get('contactPreferenceOptions').map(value => {
            // look for match with newly selected/unselected value so we can update checked state
            if (selection.get('label') === value.get('label')) {
                return value.set('checked', selection.get('checked'));
            }
            else {
                return value;
            }
        })) as UserProfileState;
    }
    else {
        return profileState.set('contactPreferenceOptions', profileState.get('contactPreferenceOptions').map(value => {
            for (let i = 0, len = preferences.size; i < len; i++) {
                // look for a match
                if (preferences.get(i) === value.get('label')) {
                    return value.set('checked', true);
                }
            }

            return value.set('checked', false);
        })) as UserProfileState;
    }
}

/**
 * when user changes their communication preferences on the User Profile screen this method
 * will update the UserInfoState object's contactPreference property
 * @param state
 * @param selection
 */
function updateUserComPreferences(state : UserState, selection : DecisionGroupOption) : UserInfoState {
    // was value checked or unchecked??
    if (selection.get('checked')) {
        // new selection so just add it
        return state.get('userInfo').update('contactPreference', element => {
            return element.push(selection.get('label'));
        }) as UserInfoState;
    }
    else {
        // we need to remove a previously selected value
        return state.get('userInfo').update('contactPreference', element => {
            return element.filter(value => {
                // only items that don't match should stay in this list
                if (value !== selection.get('label')) {
                    return value;
                }
            });
        }) as UserInfoState;
    }
}

/**
 * updates the current shown/collapsed state of the Preferred Communication Method section
 * of the User Profile Screen
 * @param state
 */
function updateComPreferencesToggleState(state : UserState) : UserProfileState {
    let profileState : UserProfileState = state.get('userProfile');

    return profileState.set('communicationExpanded', !profileState.get('communicationExpanded')) as UserProfileState;
}

/**
 * updates the current shown/collapsed state of the Personal Information section
 * of the User Profile Screen
 * @param state
 */
function updatePersonalInfoToggleState(state : UserState) : UserProfileState {
    let profileState : UserProfileState = state.get('userProfile');

    return profileState.set('personalInfoExpanded', !profileState.get('personalInfoExpanded')) as UserProfileState;
}

/**
 * updates the personalInfoEditing flag value of the UserProfileState property
 * @param state
 * @param isEditing
 * @returns {UserProfileState}
 */
function updatePersonalInfoEditingState(state : UserState, isEditing : boolean) : UserProfileState {
    let profileState : UserProfileState = state.get('userProfile');

    return profileState.set('personalInfoEditing', isEditing) as UserProfileState;
}
