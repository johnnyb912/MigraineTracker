import {fromJS, Map, Record} from 'immutable';

import {UserInfoState} from './user-info-state.model';
import {UserProfileState} from './user-profile-state.model';

interface IUserState {
    userAuthenticated   : boolean;
    userPasswordReset   : boolean;
    userInfo            : UserInfoState;
    userInfoBackup      : UserInfoState;
    userProfile         : UserProfileState;
    userProfileBackup   : UserProfileState;
}

export const USER_STATE = Record({
    userAuthenticated   : false,
    userPasswordReset   : false,
    userInfo            : new UserInfoState(),
    userInfoBackup      : new UserInfoState(),
    userProfile         : new UserProfileState(),
    userProfileBackup   : new UserProfileState()
});

/**
 * type definition for Redux Store user state
 */
export class UserState extends USER_STATE {
    userAuthenticated   : boolean;
    userPasswordReset   : boolean;
    userInfo            : UserInfoState;
    userInfoBackup      : UserInfoState;
    userProfile         : UserProfileState;

    constructor(values? : UserState | IUserState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof UserState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // userInfo
                convertedValues = convertedValues.set('userInfo', new UserInfoState(convertedValues.get('userInfo')));

                // userInfoBackup
                convertedValues = convertedValues.set('userInfoBackup', new UserInfoState(convertedValues.get('userInfoBackup')));

                // userProfile
                convertedValues = convertedValues.set('userProfile', new UserProfileState(convertedValues.get('userProfile')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
