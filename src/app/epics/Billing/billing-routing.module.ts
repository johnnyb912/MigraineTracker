import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BillingEntryComponent} from './billing-entry.component';
import {StatementsContainerComponent} from './components/container/StatementsContainer/statements-container.component';
import {PaymentStepsContainerComponent} from './components/container/PaymentStepsContainer/payment-steps.component';
import {PaymentHistoryComponent} from './components/presentational/PaymentHistory/payment-history.component';
import {PaymentMethodsComponent} from './components/presentational/PaymentMethods/payment-methods.component';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                component   : BillingEntryComponent,
                children    : [
                    {
                        path            : '',
                        component       : StatementsContainerComponent
                    },
                    {
                        path            : 'Payment',
                        component       : PaymentStepsContainerComponent
                    },
                    {
                        path            : 'PaymentHistory',
                        component       : PaymentHistoryComponent
                    },
                    {
                        path            : 'PaymentMethods',
                        component       : PaymentMethodsComponent
                    }
                ]
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class BillingRoutingModule {

}
