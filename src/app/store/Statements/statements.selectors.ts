import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';

@Injectable()

/**
 * implementation for StatementsStateSelectors: responsible for exposing custom state subscriptions to StatementsState
 */
export class StatementsStateSelectors {
    /**
     * StatementsStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}
}
