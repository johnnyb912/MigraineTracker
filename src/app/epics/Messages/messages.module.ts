import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/';
import {MessagesRoutingModule} from './messages-routing.module';
import {MessagesEntryComponent} from './messages-entry.component';
import {
    MessagesContainerComponent,
    MessagesSectionHeaderComponent,
    MessagesSidebarComponent
} from './components/';

@NgModule({
    imports         : [
        SharedModule,
        MessagesRoutingModule
    ],
    declarations    : [
        MessagesEntryComponent,
        MessagesSidebarComponent,
        MessagesSectionHeaderComponent,
        MessagesContainerComponent
    ],
    providers       : []
})

export class MessagesModule {

}
