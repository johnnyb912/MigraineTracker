import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'card-header',
    templateUrl     : './card-header.component.html',
    styleUrls       : [ './card-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation for CardHeaderComponent: handles display of dashboard status cards title
 */
export class CardHeaderComponent {
    /**
     * CardHeaderComponent constructor
     */
    constructor() {}

    /**
     * string to display as the header title field
     * @type {String}
     */
    @Input() cardTitle : string;
}
