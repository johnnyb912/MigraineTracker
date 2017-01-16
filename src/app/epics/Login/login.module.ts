import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginEntryComponent} from './login-entry.component';
import {
    LoginFormContainerComponent,
    ResetPasswordContainerComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        LoginRoutingModule
    ],
    declarations    : [
        LoginEntryComponent,
        LoginFormContainerComponent,
        ResetPasswordContainerComponent
    ],
    providers       : []
})

export class LoginModule {

}
