import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MessagesEntryComponent} from './messages-entry.component';

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path        : '',
                component   : MessagesEntryComponent
            }
        ])
    ],
    exports : [
        RouterModule
    ]
})

export class MessagesRoutingModule {

}
