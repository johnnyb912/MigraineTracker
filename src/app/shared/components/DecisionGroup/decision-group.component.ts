import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {DecisionGroupOption} from '../../../store/User';

@Component({
    selector        : 'decision-group',
    templateUrl     : './decision-group.component.html',
    styleUrls       : [ './decision-group.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of DecisionGroupComponent: handles single and multi select form fields
 */
export class DecisionGroupComponent {
    /**
     * DecisionGroupComponent constructor
     */
    constructor () {}

    /**
     * flag that enables ability to select multiple items
     * @type {boolean}
     */
    @Input() multiSelectEnabled : boolean = false;

    /**
     * list of possible decisions for user to choose from
     */
    @Input() decisionOptions : List<DecisionGroupOption>;

    /**
     * name for input group to allow for multiple instances of the component on a page
     */
    @Input() decisionName : string;

    /**
     * event triggered when user selects an item from decision group
     * @type {EventEmitter}
     */
    @Output() itemSelected : EventEmitter<DecisionGroupOption> = new EventEmitter<DecisionGroupOption>();

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
     * click event handler that stores user's selection
     * @param event DOM event details
     * @param index index of selected item
     */
    selectionMade(event : any, index : number) {
        let itemChecked = event.currentTarget.checked;  // so our change event fires BEFORE the model updates so we should grab the actual value of checked here

        // emit label of selected value along with its checked state
        this.itemSelected.emit(new DecisionGroupOption({
            label   : this.decisionOptions.get(index).get('label'),
            checked : itemChecked
        }));
    }
}
