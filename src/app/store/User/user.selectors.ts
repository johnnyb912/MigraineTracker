import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {UserInfoState} from './types/user-info-state.model';
import {UserProfileState} from './types/user-profile-state.model';

@Injectable()

/**
 * implementation for UserStateSelectors: responsible for exposing custom state subscriptions to UserState
 */
export class UserStateSelectors {
    /**
     * UserStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}

    /**
     * expose Observable to UserState.userAuthenticated
     * @returns {Observable<boolean>}
     */
    isUserAuthenticated() : Observable<boolean> {
        return this.store.select(state => state.userState.get('userAuthenticated'));
    }

    /**
     * expose Observable to UserState.userPasswordReset
     * @returns {Observable<boolean>}
     */
    isUserPasswordReset() : Observable<boolean> {
        return this.store.select(state => state.userState.get('userPasswordReset'));
    }

    /**
     * expose Observable to UserState.userInfo
     * @returns {Observable<UserInfoState>}
     */
    userInfo() : Observable<UserInfoState> {
        return this.store.select(state => state.userState.get('userInfo'));
    }

    /**
     * expose Observable to UserState.userProfile
     * @returns {Observable<UserProfileState>}
     */
    userProfile() : Observable<UserProfileState> {
        return this.store.select(state => state.userState.get('userProfile'));
    }
}
