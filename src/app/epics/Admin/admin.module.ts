import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminEntryComponent} from './admin-entry.component';
import {
    DiscontinueCoverageComponent,
    EmployeeCardComponent,
    EmployeeChangesContainerComponent,
    EmployeeComponent,
    EmployeeCoverageComponent,
    EmployeeHistoryComponent,
    EmployeeProfileComponent,
    EmployeeSectionHeaderComponent,
    EmployerChangeCardComponent,
    EmployerChangesContainerComponent,
    EmployerCompanyAdminCardComponent,
    EmployerCompanyGroupCardComponent,
    EmployerPlanCardComponent,
    EmployerSectionHeaderComponent,
    EmployerSidebarComponent,
    TerminateEmployeeComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        AdminRoutingModule
    ],
    declarations    : [
        AdminEntryComponent,
        EmployerChangesContainerComponent,
        EmployeeComponent,
        EmployeeChangesContainerComponent,
        EmployerChangesContainerComponent,
        EmployeeSectionHeaderComponent,
        EmployeeProfileComponent,
        EmployeeCoverageComponent,
        EmployeeHistoryComponent,
        EmployeeCardComponent,
        DiscontinueCoverageComponent,
        TerminateEmployeeComponent,
        EmployerSectionHeaderComponent,
        EmployerSidebarComponent,
        EmployerPlanCardComponent,
        EmployerChangeCardComponent,
        EmployerCompanyGroupCardComponent,
        EmployerCompanyAdminCardComponent
    ],
    providers       : []
})

export class AdminModule {

}
