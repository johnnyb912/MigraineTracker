import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProfileContainerComponent} from './components/';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                component   : ProfileContainerComponent
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class ProfileRoutingModule {

}
