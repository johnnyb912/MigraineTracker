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
    UserState,
    UserActions,
    UserStateSelectors,
    ILoginCreds
} from '../../../../../store/User/';

@Component({
    selector        : 'login-form-container',
    templateUrl     : './login-form-container.component.html',
    styleUrls       : [ './login-form-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for LoginFormContainerComponent: responsible for displaying/handling login workflow
 */
export class LoginFormContainerComponent {
    /**
     * LoginForm Component constructor
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
        this.userSubscription = this.userStateSelectors.isUserAuthenticated().subscribe((userAuthenticated : boolean) => {
            // check for user authenticated or not
            if (!_isUndefined(userAuthenticated) && userAuthenticated) {
                // login successful
                //this.router.navigate(['/Dashboard']);
            }
            else if (!_isUndefined(userAuthenticated) && !userAuthenticated) {
                // login failed

            }
        });

        // init form input fields
        this.email      = new FormControl('', Validators.required);
        this.password   = new FormControl('', Validators.required);

        // build FormControl group
        this.loginForm = builder.group({
            email       : this.email,
            password    : this.password
        });
    }

    /**
     * Redux state subscription
     */
    private userSubscription : Subscription;

    /**
     * current snapshot of user state
     */
    userState : UserState;

    /**
     * grouping object for login form
     */
    loginForm : FormGroup;

    /**
     * user's email input field
     */
    email : FormControl;

    /**
     * user's password input field
     */
    password : FormControl;

    /**
     * icon require for right arrow
     * @type {{arrow: (any|T)}}
     */
    icons : any = {
        arrow : require('images/SvgIcons/icon-collapse.svg')
    };

    /**
     * store user's login credentials here
     */
    loginCreds : ILoginCreds = <ILoginCreds> {};

    /**
     * handler for form submit button. Triggers login call to API
     */
    onSubmit() {
        this.userActions.userLogin(this.loginCreds);
    }

    /**
     * component destroy lifecycle hook
     */
    ngOnDestroy() {
        // unsubscribe
        this.userSubscription.unsubscribe();
    }
}
