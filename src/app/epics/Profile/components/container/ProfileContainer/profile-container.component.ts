import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {
    UserActions,
    UserInfoState,
    UserStateSelectors,
    UserProfileState,
    DecisionGroupOption,
    IUserInfoFieldUpdate
} from '../../../../../store/User/';

@Component({
    templateUrl     : './profile-container.component.html',
    styleUrls       : [ './profile-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for ProfileContainerComponent: responsible for displaying logged in user profile details
 */
export class ProfileContainerComponent {
    /**
     * ProfileContainerComponent constructor
     * @param router
     * @param cd
     * @param userActions
     * @param userSelectors
     */
    constructor (
        private router          : Router,
        private cd              : ChangeDetectorRef,
        private userActions     : UserActions,
        private userSelectors   : UserStateSelectors
    ) {
        // observe user state
        this.userProfileSubscription = Observable.combineLatest(
            this.userSelectors.userInfo(),
            this.userSelectors.userProfile())
        .subscribe(val => {
            this.userInfo       = val[0];
            this.userProfile    = val[1];

            this.cd.markForCheck();
        });
    }

    /**
     * Redux state subscription
     */
    private userProfileSubscription : Subscription;

    /**
     * current snapshot of user state
     */
    userInfo : UserInfoState;

    /**
     * current snapshot of user profile state
     */
    userProfile : UserProfileState;

    /**
     * list of SVG icons being used in our template
     * @type {{user: any}}
     */
    icons : any = {
        close   : require('images/SvgIcons/icon-close.svg'),
        minus   : require('images/SvgIcons/icon-minus.svg'),
        plus    : require('images/SvgIcons/icon-plus.svg'),
        user    : require('images/SvgIcons/icon-user.svg')
    };

    /**
     * event handler for communication preference selection updates
     * @param event
     */
    onComPreferenceUpdated(event : DecisionGroupOption) {
        // dispatch action
        this.userActions.userUpdateUserComPreferences(event);
    }

    /**
     * event handler for show/collapse toggle of user profile personal information section
     */
    onTogglePersonalInfoExpanded() {
        // dispatch action
        this.userActions.userTogglePersonalCollapsed();
    }

    /**
     * event handler for show/collapse toggle of user profile preferred communication method section
     */
    toggleCommunicationExpanded() {
        // dispatch action
        this.userActions.userToggleComPreferencesCollapsed();
    }

    /**
     * event handler for editing state of user info updates
     * @param isEditing editing state of user profile form
     */
    onTogglePersonalInfoEditing(isEditing : boolean) {
        // dispatch action
        this.userActions.userUpdateUserProfileEditing(isEditing);
    }

    /**
     * event handler for user info field update event
     * @param update
     */
    onUserFieldValueUpdate(update : IUserInfoFieldUpdate) {
        this.userActions.userUpdateUserInfoField(update);
    }

    /**
     * close profile and send user back to landing page
     */
    closeProfile() {
        this.router.navigate(['/Dashboard']);
    }

    /**
     * event handler for on updated user profile event
     * @param profileDetails the updated information for the user's profile
     */
    onUpdateProfile(profileDetails : UserInfoState) {
        // update user's profile
        this.userActions.userUpdateUser(profileDetails);
    };

    ngOnDestroy() {
        // unsubscribe from state
        this.userProfileSubscription.unsubscribe();
    }
}
