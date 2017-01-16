import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    templateUrl     : './admin-entry.component.html',
    styleUrls       : [ './admin-entry.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of AdminEntryComponent: displays information across Admin and Employee epic
 */
export class AdminEntryComponent {
    /**
     * AdminEntryComponent constructor
     */
	constructor() {}
}
