import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'employee-profile',
    templateUrl     : './employee-profile.component.html',
    styleUrls       : [ './employee-profile.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of EmployeeProfileComponent: displays current employee profile info to user
 */
export class EmployeeProfileComponent {
    /**
     * EmployeeProfileComponent constructor
     */
    constructor () {}

    /**
     * icons for use in displaying card bonus
     * @type {{dollar: (any|T), earning: (any|T), paidThrough: (any|T), employeeId: (any|T), person: (any|T),
     * dateOfBirth: (any|T), gender: (any|T), cigarette: (any|T), address: (any|T), email: (any|T), phoneOutline: (any|T), }}
     */
    icons : any = {
        dollar       : require('images/SvgIcons/icon-dollar.svg'),
        earning      : require('images/SvgIcons/icon-earning.svg'),
        paidThrough  : require('images/SvgIcons/icon-paid-through.svg'),
        employeeId   : require('images/SvgIcons/icon-employee-id.svg'),
        person       : require('images/SvgIcons/icon-person.svg'),
        dateOfBirth  : require('images/SvgIcons/icon-date-of-birth.svg'),
        gender       : require('images/SvgIcons/icon-gender.svg'),
        cigarette    : require('images/SvgIcons/icon-cigarette.svg'),
        address      : require('images/SvgIcons/icon-address-map.svg'),
        email        : require('images/SvgIcons/icon-email.svg'),
        phoneOutline : require('images/SvgIcons/icon-phone-outline.svg')
    };
}
