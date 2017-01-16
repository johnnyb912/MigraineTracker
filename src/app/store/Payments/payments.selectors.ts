import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';

@Injectable()

/**
 * implementation for PaymentsStateSelectors: responsible for exposing custom state subscriptions to PaymentsState
 */
export class PaymentsStateSelectors {
    /**
     * PaymentsStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}
}
