import {Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import * as moment from 'moment';

import * as pikaday from 'pikaday';

@Component({
    selector        : 'date-picker',
    templateUrl     : './date-picker.component.html',
    styleUrls       : [ './date-picker.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for DatePickerComponent: implements an Angular 2.x wrapped pikaday date picker instance
 */
export class DatePickerComponent {
    constructor() {}

    @ViewChild('datepicker') input : ElementRef;

    /**
     * user selected date
     * @type {string, Date}
     */
    @Input() selectedDate : string;

    /**
     * date format for date picker
     * @type {string}
     */
    @Input() dateFormat : string;

    /**
     * stores custom element to trigger opening of datepicker
     */
    @Input() dateTrigger : string;

    /**
     * minimum available date user can select
     */
    @Input() minDate : string;

    /**
     * event triggered when user selects a new date value
     * @type {EventEmitter}
     */
    @Output() itemSelected : EventEmitter<string> = new EventEmitter<string>();

    /**
     * variable to hold instance of pikaday date picker
     * @type {any}
     */
    picker : any;

    /**
     * click event handler that stores user's selection
     * @param date selected date object
     */
    selectionMade(date : any) {
        // format the date value
        let formatDate = moment(date).format(this.dateFormat);

        // set selected value
        this.picker.setMoment(date, true);

        // emit itemSelected event
        this.itemSelected.emit(formatDate);
    }

    /**
     * component initialization lifecycle hook
     */
    ngAfterViewInit() {
        // init the pikaday datepicker control
        this.picker = new pikaday({
            field    : this.input.nativeElement,
            format   : this.dateFormat,
            trigger  : this.dateTrigger ? this.dateTrigger : undefined,
            minDate  : this.minDate ? moment(this.minDate).toDate() : undefined,
            onSelect : () => this.selectionMade(this.picker.getMoment())
        });

        // if initial selected date value was supplied, populate the picker with value
        if (this.selectedDate) {
            this.picker.setMoment(moment(this.selectedDate));
        }
    }
}
