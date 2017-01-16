import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import * as _isUndefined from 'lodash/isUndefined';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import {
    UserActions,
    UserStateSelectors,
    ILoginCreds
} from '../../../../../store/User/';

@Component({
    selector        : 'reset-password-container',
    templateUrl     : './reset-password-container.component.html',
    styleUrls       : [ './reset-password-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for ResetPasswordContainerComponent: responsible for displaying/handling reset password workflow
 */
export class ResetPasswordContainerComponent {
    /**
     * ResetPasswordContainerComponent constructor
     * @param router
     * @param userActions
     * @param userStateSelectors
     * @param builder
     */
    constructor(
        private router              : Router,
        private userActions         : UserActions,
        private userStateSelectors  : UserStateSelectors,
        private builder             : FormBuilder
    ) {
        // observe user state
        this.resetPasswordSubscription = this.userStateSelectors.isUserPasswordReset().subscribe((userPasswordReset : boolean) => {
            // has a password reset been attempted yet??
            if (this.resetPasswordAttempted) {
                // check for password reset or not
                if (!_isUndefined(userPasswordReset) && userPasswordReset) {
                    // password reset successful
                    this.router.navigate(['']);
                }
                else if (!_isUndefined(userPasswordReset) && !userPasswordReset) {
                    // password reset failed

                    // set flag back to false
                    this.resetPasswordAttempted = false;
                }
            }
        });

        // init form input fields
        this.email = new FormControl('', Validators.required);

        // build FormControl group
        this.resetPasswordForm = builder.group({
            email : this.email
        });
    }

    /**
     * Redux state subscription
     */
    private resetPasswordSubscription : Subscription;

    /**
     * flag to keep track of when a reset password attempt has been made
     * @type {boolean}
     */
    private resetPasswordAttempted : boolean = false;

    /**
     * store user username here
     * @type {{type: ILoginCreds}}
     */
    loginCreds : ILoginCreds = <ILoginCreds> {};

    /**
     * grouping object for reset password form
     */
    resetPasswordForm : FormGroup;

    /**
     * user's email input field
     */
    email : FormControl;

    /**
     * handler for form submit button. Triggers reset password call to API
     */
    onSubmit() {
        // make api call to reset password
        this.userActions.userResetPassword(this.loginCreds);

        // indicate reset password attempt has been made
        this.resetPasswordAttempted = true;
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.resetPasswordSubscription.unsubscribe();
    }
}
