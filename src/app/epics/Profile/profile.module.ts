import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileEntryComponent} from './profile-entry.component';
import {
    ProfileContainerComponent,
    UserInfoComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        ProfileRoutingModule
    ],
    declarations    : [
        ProfileEntryComponent,
        ProfileContainerComponent,
        UserInfoComponent
    ],
    providers       : []
})

export class ProfileModule {

}
