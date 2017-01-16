import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'employee-section-header',
    templateUrl     : './employee-section-header.component.html',
    styleUrls       : [ './employee-section-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployeeSectionComponent; responsible for employee section header layout
 */
export class EmployeeSectionHeaderComponent {
    /**
     * EmployeeSectionHeaderComponent constructor
     */
    constructor() {}

    /**
     * controls the visible state of the search field input
     * @type {boolean}
     */
    isSearchExpanded : boolean = false;

    /**
     * icons for use in component
     * @type {{person: (any|T), search: (any|T), plus: (any|T)}}
     */
    icons : any = {
        person  : require('images/SvgIcons/icon-person-gradient.svg'),
        search  : require('images/SvgIcons/icon-search.svg'),
        plus    : require('images/SvgIcons/icon-plus.svg')
    };
}
