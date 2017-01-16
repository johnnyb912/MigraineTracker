import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'employer-section-header',
    templateUrl     : './employer-section-header.component.html',
    styleUrls       : [ './employer-section-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerSectionHeaderComponent; responsible for employer section header layout
 */
export class EmployerSectionHeaderComponent {
    /**
     * EmployerSectionHeaderComponent constructor
     */
    constructor() {}

    /**
     * company name variable
     * @type {String}
     */
    @Input() selectedEmployer : string;

    /**
     * isSearchExpanded variable
     * @type {boolean}
     */
    @Input() isSearchExpanded : boolean;

    /**
     * icons for use in component
     * @type {{building: any}}
     */
    icons : any = {
        building : require('images/SvgIcons/icon-building.svg')
    };
}
