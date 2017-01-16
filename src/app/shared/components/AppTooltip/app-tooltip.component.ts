import {Component, Input} from '@angular/core';

@Component({
    selector   : 'app-tooltip',
    templateUrl     : './app-tooltip.component.html',
    styleUrls       : [ './app-tooltip.component.scss' ]
})

export class AppTooltipComponent {
    constructor () {}

    /**
     * Path to tooltip icon
     * @type {string}
     */
    @Input() ttIcon      : string;

    /**
     * CSS Class to apply to tooltip icon
     * @type {string}
     */
    @Input() ttIconClass : string;

    /**
     * Text to display in tooltip when icon is moused oved
     * @type {string}
     */
    @Input() ttText      : string;

    /**
     * Secondary text to display in the right side of the tooltip
     * @type {string} optional
     */
    @Input() ttSecondary : string;
}
