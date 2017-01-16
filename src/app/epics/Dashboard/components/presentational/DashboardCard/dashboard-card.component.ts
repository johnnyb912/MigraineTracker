import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {
    EnumCardStatusType,
    CardBilling,
    CardEmployee,
    CardClaim
} from '../../../../../store/Dashboard';

@Component({
    selector        : 'dashboard-card',
    templateUrl     : './dashboard-card.component.html',
    styleUrls       : [ './dashboard-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of DashBoardCardComponent: displays different types of status info on Admin dashboard
 */
export class DashBoardCardComponent {
    /**
     * DashBoardCardComponent constructor
     */
    constructor() {}

    /**
     * indicates type of card being displayed
     */
    @Input() cardType : EnumCardStatusType;

    /**
     * card status data to bind to template and display
     */
    @Input() cardData : CardBilling | CardEmployee | CardClaim;

    /**
     * enum with possible card status types
     */
    cardTypes : typeof EnumCardStatusType = EnumCardStatusType;

    /**
     * icons for use in displaying card status info
     * @type {{contract: (any|T), person: (any|T), accident: (any|T), criticalIllness: (any|T), employee: (any|T), fall: (any|T), life: (any|T), statement: (any|T)}}
     */
    icons : any = {
        contract         : require('images/SvgIcons/icon-contract.svg'),
        person           : require('images/SvgIcons/icon-person.svg'),
        accident         : require('images/SvgIcons/icon-accident.svg'),
        criticalIllness  : require('images/SvgIcons/icon-critical-illness.svg'),
        employee         : require('images/SvgIcons/icon-employee.svg'),
        contractGradient : require('images/SvgIcons/icon-contract-gradient.svg'),
        fall             : require('images/SvgIcons/icon-fall.svg'),
        life             : require('images/SvgIcons/icon-life.svg'),
        statement        : require('images/SvgIcons/icon-statement.svg')
    };
}
