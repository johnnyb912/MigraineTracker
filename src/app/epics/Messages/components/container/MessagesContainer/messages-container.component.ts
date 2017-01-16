import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'messages-container',
    templateUrl     : './messages-container.component.html',
    styleUrls       : [ './messages-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for MessagesContainerComponent
 */
export class MessagesContainerComponent {
    /**
     * MessagesContainerComponent constructor
     */
    constructor() {}

    /**
     * salaried employees text
     */
    salariedEmployeesText : string = '$2,576.96* X 26 pay periods';

    /**
     * salaried employees sum
     */
    salariedEmployeesSum : string = '$66,999.92';

    /**
     * additional earnings
     */
    additionalEarnings : any = '0.00';

    /**
     * annual earnings
     */
    annualEarnings : any = {
        weekly   : '$1,098.34',
        monthly  : '$4,759.48',
        annually : '$66,999.92'
    };

    /**
     * required icons for display in template
     * @type {{resize: (any|T), eye: (any|T), plus: (any|T)}}
     */
    icons : any = {
        resize  : require('images/SvgIcons/icon-resize.svg'),
        eye     : require('images/SvgIcons/icon-eye.svg'),
        plus    : require('images/SvgIcons/icon-plus.svg')
    };
}
