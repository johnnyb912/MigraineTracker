import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {EnumNavOption} from './types/nav-option.model';

@Injectable()

export class NavActions {
    static UPDATE_NAV = 'UPDATE_NAV';

    constructor(private store : NgRedux<IAppState>) {}

    updateActiveNavState(link : EnumNavOption) {
        this.store.dispatch({
            type    : NavActions.UPDATE_NAV,
            payload : link
        });
    }
}
