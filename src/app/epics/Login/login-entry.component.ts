import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    NavActions,
    EnumNavOption
} from '../../store/Navigation';

@Component({
    templateUrl     : './login-entry.component.html',
    styleUrls       : [ './login-entry.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for LoginEntryComponent: parent component for Login epic
 */
export class LoginEntryComponent {
    /**
     * LoginEntryComponent constructor
     * @param navActions
     */
    constructor (private navActions : NavActions) {}

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // set active epic to login
        this.navActions.updateActiveNavState(EnumNavOption.LOGIN);
    }
}
