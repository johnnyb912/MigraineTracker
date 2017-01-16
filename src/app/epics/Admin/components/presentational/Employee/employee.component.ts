import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

import {UserInfoState} from '../../../../../store/User/';

@Component({
    templateUrl     : './employee.component.html',
    styleUrls       : [ './employee.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of EmployeeComponent: displays current employee profile to user
 */
export class EmployeeComponent {
    /**
     * EmployeeComponent constructor
     * @param router
     */
    constructor (private router : Router) {}

    /**
     * stores local copy of logged in user's demographic data
     */
    userInfo : UserInfoState;

    /**
     * icons for use in displaying card bonus
     * @type {{user: (any|T)}}
     */
    icons : any = {
        user    : require('images/SvgIcons/icon-user.svg'),
        close   : require('images/SvgIcons/icon-close.svg'),
        minus   : require('images/SvgIcons/icon-minus.svg'),
        plus    : require('images/SvgIcons/icon-plus.svg')
    };

    /**
     * series of booleans used to keep track of the expanded/closed state of the various accordions in the employee page
     * @type {{employeeProfile: boolean, employeeCoverage: boolean, employeeHistory: boolean}}
     */
    section = {
        employeeProfile     : true,
        employeeCoverage    : false,
        employeeHistory     : false
    };

    /**
     * close profile and send user back to landing page
     */
    closeEmployee() {
        this.router.navigate(['/Admin/EmployeeChanges']);
    }
}
