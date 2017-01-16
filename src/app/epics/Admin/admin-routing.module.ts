import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AdminEntryComponent} from './admin-entry.component';
import {
    EmployeeComponent,
    EmployerChangesContainerComponent,
    EmployeeChangesContainerComponent
} from './components/';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                component   : AdminEntryComponent,
                children    : [
                    {
                        path            : '',
                        component       : EmployerChangesContainerComponent
                    },
                    {
                        path            : 'EmployeeProfile',
                        component       : EmployeeComponent
                    },
                    {
                        path            : 'EmployeeChanges',
                        component       : EmployeeChangesContainerComponent
                    },
                    {
                        path            : 'EmployerChanges',
                        component       : EmployerChangesContainerComponent
                    }
                ]
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class AdminRoutingModule {

}
