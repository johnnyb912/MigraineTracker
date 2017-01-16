import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    templateUrl     : './messages-entry.component.html',
    styleUrls       : [ './messages-entry.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for MessagesEntryComponent: responsible for messages epic layout and routing
 */
export class MessagesEntryComponent {
    /**
     * MessagesEntryComponent constructor
     */
    constructor() {}
}
