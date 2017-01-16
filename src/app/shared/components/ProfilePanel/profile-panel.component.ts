import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {UserInfoState} from '../../../store/User/';

@Component({
    selector   : 'profile-panel',
    templateUrl     : './profile-panel.component.html',
    styleUrls       : [ './profile-panel.component.scss' ]
})

/**
 * implementation for ProfilePanelComponent: responsible for user profile slideout
 */
export class ProfilePanelComponent {
    /**
     * ProfilePanelComponent constructor
     * @param router
     */
    constructor (private router : Router) {}

    /**
     * logged in user's display name
     */
    @Input() profileDetails : UserInfoState;

    /**
     * controls the visible state of the user profile panel
     * @type {boolean}
     */
    @Input() profileVisible : boolean = false;

    /**
     * used to hide the user profile panel
     * @type {"events".EventEmitter}
     */
    @Output() closeProfile : EventEmitter<any> = new EventEmitter();

    /**
     * list of svg icons need in component template
     * @type {{close: (any|T), user: (any|T), edit: (any|T)}}
     */
    icons : any = {
        close : require('images/SvgIcons/icon-close.svg'),
        user  : require('images/SvgIcons/icon-user.svg'),
        edit  : require('images/SvgIcons/icon-edit.svg')
    };

    /**
     * trigger close of profile panel
     */
    closePanel() {
        this.closeProfile.emit(false);
    }

    /**
     * stub'd up logout method
     */
    logout() {
        this.router.navigate(['/Login']);
    }
}
