import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {PlanState} from '../../../../../store/EmployerChanges/';

@Component({
    selector        : 'employer-plan-card',
    templateUrl     : './employer-plan-card.component.html',
    styleUrls       : [ './employer-plan-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerPlanCardComponent; responsible for employer plan-card layout
 */
export class EmployerPlanCardComponent {
    /**
     * EmployerPlanCardComponent constructor
     */
    constructor() {}

    /**
     * information to display on card
     */
    @Input() cardData : PlanState;

    /**
     * icons for use in component
     * @type {}
     */
    icons : any = {
        employee         : require('images/SvgIcons/icon-employee.svg'),
        contractGradient : require('images/SvgIcons/icon-contract-gradient.svg'),
        criticalIllness  : require('images/SvgIcons/icon-critical-illness.svg'),
        fall             : require('images/SvgIcons/icon-fall.svg'),
        life             : require('images/SvgIcons/icon-life.svg')
    };
}
