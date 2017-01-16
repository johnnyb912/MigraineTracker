import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {EnumNavOption} from './types/';

@Injectable()

/**
 * implementation for NavStateSelectors: responsible for exposing custom state subscriptions to NavState
 */
export class NavStateSelectors {
    /**
     * NavStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}

    /**
     * expose Observable to NavState.activeNavState
     * @returns {Observable<EnumNavOption>}
     */
    activeNavState() : Observable<EnumNavOption> {
        return this.store.select(state => state.navState.get('activeNavState'));
    }
}
