import {Component, ChangeDetectionStrategy} from '@angular/core';

import './sass-config.scss';

@Component({
    selector        : 'depalma-app',
    template        : `<router-outlet></router-outlet>`,
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of AppComponent: Top Level Root Component for the application
 */
export class AppComponent {
    /**
     * AppComponent constructor
     */
    constructor() {}
}
