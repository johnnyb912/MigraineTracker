import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {EnumNavOption} from '../../store/Navigation/';
import {NavActions} from '../../store/Navigation/';

@Component({
    templateUrl     : './profile-entry.component.html',
    styleUrls       : [ './profile-entry.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for ProfileEntryComponent: entry component for Profile epic
 */
export class ProfileEntryComponent {
    /**
     * ProfileEntryComponent constructor
     * @param navActions
     */
    constructor (private navActions : NavActions) {}

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // set active epic to login
        this.navActions.updateActiveNavState(EnumNavOption.PROFILE);
    }
}
