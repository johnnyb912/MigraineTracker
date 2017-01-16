import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

/**
 * ng2-translate
 */
import {TranslateModule} from 'ng2-translate/ng2-translate';

/**
 * shared components
 */
import {
    AppFooterComponent,
    AppNavigationComponent,
    AppTooltipComponent,
    DatePickerComponent,
    DecisionGroupComponent,
    ProfilePanelComponent,
    SectionHeaderComponent,
    SvgIconComponent
} from './components/';

/**
 * shared pipes
 */
import {CurrencyFormatPipe} from './pipes/';

/**
 * third party
 */
import {
    DropdownModule,
    CarouselModule
} from 'ng2-bootstrap/ng2-bootstrap';

/**
 * Shared application module, essentially wrapping up anything in our app/shared directory.  Note: This Module only
 * imports dependencies needed by components in the 'declarations' array.  Angular, however, lets us re-export other
 * dependencies for consumption by other modules, even though they were not explicitly imported here
 */
@NgModule({
    imports         : [
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule,
        DropdownModule,
        CarouselModule
    ],
    declarations    : [
        CurrencyFormatPipe,
        SvgIconComponent,
        AppFooterComponent,
        AppNavigationComponent,
        ProfilePanelComponent,
        AppTooltipComponent,
        DatePickerComponent,
        DecisionGroupComponent,
        SectionHeaderComponent
    ],
    exports         : [
        CommonModule,
        RouterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DropdownModule,
        CarouselModule,
        CurrencyFormatPipe,
        SvgIconComponent,
        AppFooterComponent,
        AppNavigationComponent,
        ProfilePanelComponent,
        AppTooltipComponent,
        DatePickerComponent,
        DecisionGroupComponent,
        SectionHeaderComponent
    ],
    providers       : []
})

export class SharedModule {

}
