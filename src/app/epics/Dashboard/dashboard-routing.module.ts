import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DashboardBodyContainerComponent} from './components/';
import {DashboardEntryComponent} from './dashboard-entry.component';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                component   : DashboardEntryComponent,
                children    : [
                    {
                        path        : '',
                        component   : DashboardBodyContainerComponent
                    }
                ]
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class DashboardRoutingModule {

}
