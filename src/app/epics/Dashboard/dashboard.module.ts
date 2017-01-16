import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardEntryComponent} from './dashboard-entry.component';
import {
    CardHeaderComponent,
    DashboardBodyContainerComponent,
    DashBoardCardComponent,
    DashboardCarouselContainerComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        DashboardRoutingModule
    ],
    declarations    : [
        DashboardEntryComponent,
        DashboardBodyContainerComponent,
        DashBoardCardComponent,
        CardHeaderComponent,
        DashboardCarouselContainerComponent
    ],
    providers       : []
})

export class DashboardModule {

}
