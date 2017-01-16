import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'employer-change-card',
    templateUrl     : './employer-change-card.component.html',
    styleUrls       : [ './employer-change-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerChangeCardComponent; responsible for employer change request card layout
 */
export class EmployerChangeCardComponent {
    /**
     * EmployerChangeCardComponent constructor
     */
    constructor() {}

    /**
     * information to display on card
     */
    @Input() cardData : any;

    /**
     * event triggered when user clicks on ADD button (Group section)
     * @type {EventEmitter}
     */
    @Output() addGroup : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on EDIT button (Group section)
     * @type {EventEmitter}
     */
    @Output() editGroup : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on ADD button (Subsidiary section)
     * @type {EventEmitter}
     */
    @Output() addSubsidiary : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on EDIT button (Subsidiary section)
     * @type {EventEmitter}
     */
    @Output() editSubsidiary : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on ADD button (Plan section)
     * @type {EventEmitter}
     */
    @Output() addPlan : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on EDIT button (Plan section)
     * @type {EventEmitter}
     */
    @Output() editPlan : EventEmitter<any> = new EventEmitter();

    /**
     * invoking appropriate event handler according clicked ADD button (Group / Subsidiary / Plan)
     */
    addButton(cardData : string) {
        switch (cardData) {
            case 'GROUP':
                this.doAddGroup();
                break;
            case 'SUBSIDIARY':
                this.doAddSubsidiary();
                break;
            case 'PLAN':
                this.doAddPlan();
                break;
            default:
                break;
        }
    }

    /**
     * event handler for Add Group
     */
    doAddGroup() {
        this.addGroup.emit(undefined);
    }

    /**
     * event handler for Add Subsidiary
     */
    doAddSubsidiary() {
        this.addSubsidiary.emit(undefined);
    }

    /**
     * event handler for Add Plan
     */
    doAddPlan() {
        this.addPlan.emit(undefined);
    }

    /**
     * invoking appropriate event handler according clicked EDIT button (Group / Subsidiary / Plan)
     */
    editButton(cardData : string) {
        switch (cardData) {
            case 'GROUP':
                this.doEditGroup();
                break;
            case 'SUBSIDIARY':
                this.doEditSubsidiary();
                break;
            case 'PLAN':
                this.doEditPlan();
                break;
            default:
                break;
        }
    }

    /**
     * event handler for Edit Group
     */
    doEditGroup() {
        this.editGroup.emit(undefined);
    }

    /**
     * event handler for Edit Subsidiary
     */
    doEditSubsidiary() {
        this.editSubsidiary.emit(undefined);
    }

    /**
     * event handler for Edit Plan
     */
    doEditPlan() {
        this.editPlan.emit(undefined);
    }

    /**
     * icons for use in component
     * @type {}
     */
    icons : any = {
        group      : require('images/SvgIcons/icon-group.svg'),
        subsidiary : require('images/SvgIcons/icon-subsidiary.svg'),
        plan       : require('images/SvgIcons/icon-plan.svg')
    };
}
