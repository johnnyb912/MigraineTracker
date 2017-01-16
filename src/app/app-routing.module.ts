import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';

import {NoContentComponent} from './no-content.component';

@NgModule({
    imports : [
        RouterModule.forRoot([
                {
                    path            : 'Profile',
                    loadChildren    : () => System.import('./epics/Profile/profile.module').then((module : any) => module['ProfileModule'])
                },
                {
                    path            : 'Messages',
                    loadChildren    : () => System.import('./epics/Messages/messages.module').then((module : any) => module['MessagesModule'])
                },
                {
                    path            : 'Dashboard',
                    loadChildren    : () => System.import('./epics/Dashboard/dashboard.module').then((module : any) => module['DashboardModule'])
                },
                {
                    path            : 'Billing',
                    loadChildren    : () => System.import('./epics/Billing/billing.module').then((module : any) => module['BillingModule'])
                },
                {
                    path            : 'Admin',
                    loadChildren    : () => System.import('./epics/Admin/admin.module').then((module : any) => module['AdminModule'])
                },

                /**
                 * default route i.e. route used when no matching route found
                 */
                {
                    path        : '',
                    redirectTo  : 'Login',
                    pathMatch   : 'full'
                },

                /**
                 * 404 handler
                 */
                {
                    path        : '**',
                    component   : NoContentComponent
                }
            ],

            /**
             * enforce use of HashLocationStrategy
             * and preload all lazy loaded modules
             */
            {
                useHash             : true,
                preloadingStrategy  : PreloadAllModules
            })
    ],
    exports : [
        RouterModule
    ]
})

export class AppRoutingModule {

}
