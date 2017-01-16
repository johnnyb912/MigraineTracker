import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'svg-icon',
    templateUrl     : './svg-icon.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of SvgIconComponent: handles display of SVG icons in the UI
 */
export class SvgIconComponent {
    /**
     * SvgIconComponent constructor
     */
    constructor() { }

    /**
     * path to the SVG icon to be rendered
     * @type {String}
     */
    @Input() svgPath : string;

    /**
     * CSS class to apply to SVG icon to be rendered
     * @type {String}
     */
    @Input() svgClass : string;
}
