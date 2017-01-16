import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginEntryComponent} from './login-entry.component';
import {
    LoginFormContainerComponent,
    ResetPasswordContainerComponent
} from './components/';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                redirectTo  : '/Login',
                pathMatch   : 'full'

            },
            {
                path        : 'Login',
                component   : LoginEntryComponent,
                children    : [
                    {
                        path            : '',
                        component       : LoginFormContainerComponent
                    },
                    {
                        path            : 'ResetPassword',
                        component       : ResetPasswordContainerComponent
                    }
                ]
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class LoginRoutingModule {

}
