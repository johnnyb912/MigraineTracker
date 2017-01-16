import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector        : 'messages-section-header',
	templateUrl     : './messages-section-header.component.html',
	styleUrls       : [ './messages-section-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for MessagesSectionHeaderComponent; responsible for messages section header layout
 */
export class MessagesSectionHeaderComponent {

	/**
	 * MessagesSectionHeaderComponent constructor
	 */
	constructor() {}

	/**
	 * icons for use in component
	 * @type {envelope: (any|T)}
	 */
	icons : any = {
		envelope : require('images/SvgIcons/icon-envelope-red.svg')
	};
}
