import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';

import * as moment from 'moment';

@Component({
    selector        : 'terminate-employee',
    templateUrl     : './terminate-employee.component.html',
    styleUrls       : [ './terminate-employee.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of TerminateEmployeeComponent: displays current employee profile to user
 */
export class TerminateEmployeeComponent {
    /**
     * TerminateEmployeeComponent constructor
     */
    constructor () {}

    /**
     * employee data to dislay in component
     */
    @Input() employee : any;

    /**
     * store selected termination reason here
     * @type {string}
     */
    @Input() selectedReason : string = 'Select a reason';

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
        terminateEmployment : require('images/SvgIcons/icon-terminate-employment.svg')
    };

    /**
     * Date format to use in date picker
     * @type {string}
     */
    dateFormat : string = 'MM/DD/YYYY';

    /**
     * default value for date picker
     */
    selectedDate = moment().format('YYYY-MM-DD');

    /**
     * flag for changes button and show question
     * @type {boolean}
     */
    questionShow = false;

    /**
     * flag for changes button and show download form
     * @type {boolean}
     */
    downloadForm = false;

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @param obj
     * @returns {number}
     */
    static trackByIndex(index : number, obj : any) : any {
        return index;
    }

    /**
     * event handler for show/hide download form
     */
    submitConfirm() {
        this.downloadForm = true;
        this.questionShow = false;
    }

    /**
     * close modal and send user back to Employee Changes page
     */
    closeModalWindow(event : any) {
        this.closeModal.emit(event);
    }

    /**
     * event handler for date picker
     * @param value
     */
    onItemSelected(value? : string) {
        this.selectedDate = moment(value).format('YYYY-MM-DD');
    }

    /**
     * list of possible termination reason
     * @type {{id: number, value: string}[]}
     */
    reasonList : Array<any> = [
        {
            id   : 0,
            value: 'Retirement'
        },
        {
            id    : 1,
            value : 'Retirement2'
        }
    ];

    /**
     * event handler for termination reason selection event
     * @param choice selected phone tye
     * @param event DOM event
     */
    setReasonList(choice : number, event : any) {
        this.selectedReason = this.reasonList[choice].value;
    }
}
