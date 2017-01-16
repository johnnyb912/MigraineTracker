import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';

@Component({
    selector        : 'employee-card',
    templateUrl     : './employee-card.component.html',
    styleUrls       : [ './employee-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of EmployeeCardComponent: displays information across Employee Cards
 */
export class EmployeeCardComponent {
    /**
     * EmployeeCardComponent constructor
     */
    constructor() {}

    /**
     * store selected insurance provider here
     * @type {string}
     */
    @Input() cardData : any;

    /**
     * flag that triggers show or hide List view for Cards
     * @type {boolean}
     */
    @Input() changeViewState : string;

    /**
     * event triggered when user selects an item from decision group
     * @type {EventEmitter}
     */
    @Output() actionSelected : EventEmitter<any> = new EventEmitter<any>();

    /**
     * event triggered checkbox on card
     * @type {EventEmitter}
     */
    @Output() cardChecked : EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * flag that triggers which side of the card to display
     * @type {boolean}
     */
    showEmployeeActions : boolean = false;

    /**
     * flag that triggers is card checked with checkbox or not
     * @type {boolean}
     */
    isCardChecked : boolean = false;

    /**
     * icons for use in displaying card bonus
     * @type {{gear: (any|T), resize: (any|T)}}
     */
    icons : any = {
        gear        : require('images/SvgIcons/icon-gear.svg'),
        resize      : require('images/SvgIcons/icon-resize.svg'),
        checkmark   : require('images/SvgIcons/icon-checkmark.svg')
    };

    /**
     * click event handler for employee card buttons
     * @param type
     */
    employeeAction(type : string) {
        let data : any = {
            type,
            employee  : this.cardData
        };

        // flip card
        this.showEmployeeActions = false;

        // emit actionSelected event
        this.actionSelected.emit(data);
    }

    /**
     * click event handler for employee card checkbox
     */
    cardCheckbox() {
        this.isCardChecked = !this.isCardChecked;

        // emit cardChecked event
        this.cardChecked.emit(this.isCardChecked);
    }
}
