import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {
    CompanyState,
    PlanState,
    EmployerSideBarState,
    EnumEmployerSideBarCategory
} from '../../../../../store/EmployerChanges/';

@Component({
    selector        : 'employer-sidebar',
    templateUrl     : './employer-sidebar.component.html',
    styleUrls       : [ './employer-sidebar.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerSidebarComponent; responsible for employer sidebar layout
 */
export class EmployerSidebarComponent {
    /**
     * EmployerSidebarComponent constructor
     */
    constructor() {}

    /**
     * triggered when sidebar category is collapsed
     */
    @Input() sideBarState  : EmployerSideBarState;

    /**
     * list of available companies passsed in here
     */
    @Input() companies : List<CompanyState>;

    /**
     * list of available plans passsed in here
     */
    @Input() plans : List<PlanState>;

    /**
     * event triggered when user expands/collapses sidebar section
     * @type {EventEmitter}
     */
    @Output() toggleExpanded : EventEmitter<EnumEmployerSideBarCategory> = new EventEmitter<EnumEmployerSideBarCategory>();

    /**
     * event triggered when user clicks on company name
     * @type {EventEmitter}
     */
    @Output() updateCompanyName : EventEmitter<string> = new EventEmitter<string>();

    /**
     * event triggered when user clicks on plan type
     * @type {EventEmitter}
     */
    @Output() updatePlanType : EventEmitter<string> = new EventEmitter<string>();

    /**
     * event triggered when user clicks on Add new Billing Group link
     * @type {EventEmitter}
     */
    @Output() addNewBillingGroup : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on Add new Subsidiary link
     * @type {EventEmitter}
     */
    @Output() addNewSubsidiary : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on Add new Plan link
     * @type {EventEmitter}
     */
    @Output() addNewPlan : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user clicks on Employees link
     * @type {EventEmitter}
     */
    @Output() employeesLink : EventEmitter<any> = new EventEmitter();

    /**
     * icons for use in component
     * @type {}
     */
    icons : any = {
        minus : require('images/SvgIcons/icon-minus.svg'),
        plus  : require('images/SvgIcons/icon-plus.svg')
    };

    /**
     * event handler for collapsing section
     */
    toggleExpandedState(name : EnumEmployerSideBarCategory) {
        // trigger event
        this.toggleExpanded.emit(EnumEmployerSideBarCategory[EnumEmployerSideBarCategory[name]]);
    }

    /**
     * event handler for updating of the current company
     */
    updateCurrentCompany(name : string) {
        this.updateCompanyName.emit(name);
    }

    /**
     * event handler for updating of the current plan
     */
    updateCurrentPlan(type : string) {
        this.updatePlanType.emit(type);
    }

    /**
     * invoking appropriate event handler according clicked link (Add new Billing Group / Subsidiary / Plan)
     */
    addNewLink(link : string) {
        switch (link) {
            case 'ADD_NEW_BILLING_GROUP':
                this.doAddNewBillingGroup();
                break;
            case 'ADD_NEW_SUBSIDIARY':
                this.doAddNewSubsidiary();
                break;
            case 'ADD_NEW_PLAN':
                this.doAddNewPlan();
                break;
            default:
                break;
        }
    }

    /**
     * event handler for Add new Billing Group link
     */
    doAddNewBillingGroup() {
        this.addNewBillingGroup.emit(undefined);
    }

    /**
     * event handler for Add new Subsidiary link
     */
    doAddNewSubsidiary() {
        this.addNewSubsidiary.emit(undefined);
    }

    /**
     * event handler for Add new Plan link
     */
    doAddNewPlan() {
        this.addNewPlan.emit(undefined);
    }

    /**
     * event handler for employee link
     */
    employeesLinkState() {
        this.employeesLink.emit(undefined);
    }

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @param obj
     * @returns {number}
     */
    static trackByIndex(index : number, obj : any) : any {
        return index;
    }
}
