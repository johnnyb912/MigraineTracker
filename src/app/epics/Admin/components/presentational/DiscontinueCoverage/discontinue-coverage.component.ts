import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';

import * as moment from 'moment';

@Component({
    selector        : 'discontinue-coverage',
    templateUrl     : './discontinue-coverage.component.html',
    styleUrls       : [ './discontinue-coverage.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of DiscontinueCoverageComponent: displays current employee profile to user
 */
export class DiscontinueCoverageComponent {
    /**
     * DiscontinueCoverageComponent constructor
     */
    constructor () {}

    /**
     * employee data to dislay in component
     */
    @Input() employee : any;

    /**
     * event triggered to close the modal
     * @type {"events".EventEmitter}
     */
    @Output() closeModal : EventEmitter<any> = new EventEmitter<any>();

    /**
     * icons for use in displaying card bonus
     * @type {{close: (any|T)}}
     */
    icons : any = {
        discontinueCoverage    : require('images/SvgIcons/icon-discontinue-coverage.svg')
    };

    /**
     * close modal and send user back to Employee Changes page
     */
    closeModalWindow(event : any) {
        this.closeModal.emit(event);
    }

    /**
     * Date format to use in date picker
     * @type {string}
     */
    dateFormat : string = 'MM/DD/YYYY';

    /**
     * default value for date picker
     * @type {any|string|void}
     */
    selectedDate = moment().format('YYYY-MM-DD');

    /**
     *
     * @type {boolean}
     */
    questionShow = false;

    /**
     * event handler for date picker
     * @param value
     */
    onItemSelected(value? : string) {
        this.selectedDate = moment(value).format('YYYY-MM-DD');
    }
}
