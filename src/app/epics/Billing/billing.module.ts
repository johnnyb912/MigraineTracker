import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {BillingRoutingModule} from './billing-routing.module';
import {BillingEntryComponent} from './billing-entry.component';
import {
    StatementsContainerComponent,
    StatementsSectionHeaderComponent,
    PaymentStepsContainerComponent,
    PaymentHistoryComponent,
    PaymentMethodsComponent,
    StatementHeaderComponent,
    StatementsSideBarNavigationComponent,
    StatementCardComponent,
    PaymentSuccessComponent,
    PaymentStepsReviewComponent,
    PaymentStepsMethodComponent,
    PaymentsStepsHeaderComponent,
    PaymentStepsFooterComponent,
    PaymentStepsAmountComponent,
    PaymentStepsAddAccountComponent,
    PaymentStepsAccountComponent,
    PaymentMethodHeaderComponent,
    PaymentMethodCardComponent,
    PaymentHistoryHeaderComponent,
    PaymentHistoryCardComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        BillingRoutingModule
    ],
    declarations    : [
        BillingEntryComponent,
        StatementsContainerComponent,
        PaymentStepsContainerComponent,
        PaymentHistoryComponent,
        PaymentMethodsComponent,
        StatementsSectionHeaderComponent,
        StatementHeaderComponent,
        StatementsSideBarNavigationComponent,
        StatementCardComponent,
        PaymentSuccessComponent,
        PaymentStepsReviewComponent,
        PaymentStepsMethodComponent,
        PaymentsStepsHeaderComponent,
        PaymentStepsFooterComponent,
        PaymentStepsAmountComponent,
        PaymentStepsAddAccountComponent,
        PaymentStepsAccountComponent,
        PaymentMethodHeaderComponent,
        PaymentMethodCardComponent,
        PaymentHistoryHeaderComponent,
        PaymentHistoryCardComponent
    ],
    providers       : []
})

export class BillingModule {

}
