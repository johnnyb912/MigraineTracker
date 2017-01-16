import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {ILoginCreds} from './types/';
import {UserService} from '../../shared/services/';
import {
    UserInfoState,
    IUserInfoState,
    DecisionGroupOption,
    IUserInfoFieldUpdate
} from './types/';

@Injectable()

export class UserActions {
    static USER_LOGIN_SUCCESS           = 'USER_LOGIN_SUCCESS';
    static USER_LOGIN_FAILED            = 'USER_LOGIN_FAILED';
    static USER_LOGOUT                  = 'USER_LOGOUT';
    static USER_RESET_PW_SUCCESS        = 'USER_RESET_PW_SUCCESS';
    static USER_RESET_PW_FAILED         = 'USER_RESET_PW_FAILED';
    static USER_UPDATE                  = 'USER_UPDATE';
    static USER_UPDATE_COM_PREF         = 'USER_UPDATE_COM_PREF';
    static USER_TOGGLE_COM_PREF         = 'USER_TOGGLE_COM_PREF';
    static USER_TOGGLE_PERSONAL         = 'USER_TOGGLE_PERSONAL';
    static USER_UPDATE_EDITING          = 'USER_UPDATE_EDITING';
    static USER_UPDATE_USER_FIELD       = 'USER_UPDATE_USER_FIELD';

    constructor(
        private store       : NgRedux<IAppState>,
        private userService : UserService
    ) {}

    /**
     * trigger async user login service call
     * @param loginCreds
     */
    userLogin(loginCreds : ILoginCreds) {
        this.userService.login(loginCreds).subscribe(response => {
            // update user profile info
            this.userUpdateUserInfo(response);

            // indicate login was successful
            this.userLoginSuccess();
        }, error => {
            // indicate login failed
            this.userLoginFailed();
        });
    }

    /**
     * trigger async user logout service call
     */
    userLogout() {
        this.userService.logout().subscribe(response => {
            // remove user state
            this.store.dispatch({ type : UserActions.USER_LOGOUT });
        }, error => {
            // remove user state
            this.store.dispatch({ type : UserActions.USER_LOGOUT });
        });
    }

    /**
     * trigger async user reset password service call
     * @param loginCreds
     */
    userResetPassword(loginCreds : ILoginCreds) {
        this.userService.resetPassword(loginCreds).subscribe(response => {
            // indicate password reset was successful
            this.userResetPasswordSuccess();
        }, error => {
            // indicate password reset failed
            this.userResetPasswordFailed();
        });
    }

    /**
     * trigger async update user service call then dispatch action to update Redux store
     * with new saved user info
     * @param userProfile
     */
    userUpdateUser(userProfile : UserInfoState) {
        this.userService.updateUser(userProfile).subscribe(response => {
            this.userUpdateUserInfo(response);
        }, error => {
            this.userUpdateUserInfo(error);
        });
    }

    /**
     * trigger async user details request service call then dispatch action
     * to populate redux store with the returned user details
     */
    userGetCurrentUser() {
        this.userService.getCurrentUser().subscribe(response => {
            this.userUpdateUserInfo(response);
        }, error => {
            this.userUpdateUserInfo(error);
        });
    }

    /**
     * dispatch action to update user login success flag on redux store
     */
    userLoginSuccess() {
        this.store.dispatch({ type : UserActions.USER_LOGIN_SUCCESS });
    }

    /**
     * dispatch action to update user login failed flag on redux store
     */
    userLoginFailed() {
        this.store.dispatch({ type : UserActions.USER_LOGIN_FAILED });
    }

    /**
     * dispatch action to update user reset password success flag on redux store
     */
    userResetPasswordSuccess() {
        this.store.dispatch({ type : UserActions.USER_RESET_PW_SUCCESS });
    }

    /**
     * dispatch action to update user reset password success flag on redux store
     */
    userResetPasswordFailed() {
        this.store.dispatch({ type : UserActions.USER_RESET_PW_FAILED });
    }

    /**
     * dispatch action to update user personal info expanded/collapsed flag on redux store
     */
    userTogglePersonalCollapsed() {
        this.store.dispatch({ type : UserActions.USER_TOGGLE_PERSONAL });
    }

    /**
     * dispatch action to update user communication preferences expanded/collapsed flag on redux store
     */
    userToggleComPreferencesCollapsed() {
        this.store.dispatch({ type : UserActions.USER_TOGGLE_COM_PREF });
    }

    /**
     * dispatch action to update user personal info editing flag on redux store
     * @param isEditing current edited state of user profile form
     */
    userUpdateUserProfileEditing(isEditing : boolean) {
        this.store.dispatch({
            type    : UserActions.USER_UPDATE_EDITING,
            payload : isEditing
        });
    }

    /**
     * dispatch action with updated userInfo details
     * @param userInfo
     */
    userUpdateUserInfo(userInfo? : IUserInfoState | UserInfoState) {
        this.store.dispatch({
            type    : UserActions.USER_UPDATE,
            payload : userInfo
        });
    }

    /**
     * dispatch action with updated user communication preferences
     * @param preferences
     */
    userUpdateUserComPreferences(preferences : DecisionGroupOption) {
        this.store.dispatch({
            type    : UserActions.USER_UPDATE_COM_PREF,
            payload : preferences
        });
    }

    /**
     * dispatch action with updated input data for user input field
     * @param update
     */
    userUpdateUserInfoField(update : IUserInfoFieldUpdate) {
        this.store.dispatch({
            type    : UserActions.USER_UPDATE_USER_FIELD,
            payload : update
        });
    }
}
