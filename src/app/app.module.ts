/**
 * Core Angular Dependencies
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Http} from '@angular/http';

/**
 * ng2-translate
 */
import {
    TranslateModule,
    TranslateLoader,
    TranslateStaticLoader,
    TranslateService
} from 'ng2-translate/ng2-translate';
import {APP_TRANSLATIONS} from './app.translations';

/**
 * Root App Component
 */
import {AppComponent} from './app.component';

/**
 * HTTP 404 Component
 */
import {NoContentComponent} from './no-content.component';

/**
 * Root Routing Config
 */
import {AppRoutingModule} from './app-routing.module';

/**
 * Shared Application Module
 */
import {SharedModule} from './shared/';

/**
 * Epic Modules
 */
import {LoginModule} from './epics/Login/';

/**
 * ng2redux
 */
import {
    DevToolsExtension,
    NgReduxModule,
    NgRedux
} from 'ng2-redux';

import {
    IAppState,
    ROOT_REDUCER,
    middleware,
    enhancers,
    reimmutify
} from './store';

/**
 * Actions and Selectors
 */
import {
    UserActions,
    UserStateSelectors
} from './store/User/';
import {
    NavActions,
    NavStateSelectors
} from './store/Navigation/';
import {
    DashboardActions,
    DashboardStateSelectors
} from './store/Dashboard/';
import {
    StatementsActions,
    StatementsStateSelectors
} from './store/Statements/';
import {
    PaymentActions,
    PaymentsStateSelectors
} from './store/Payments/';
import {
    EmployeeChangesActions,
    EmployeeChangesStateSelectors
} from './store/EmployeeChanges/';
import {
    EmployerChangesActions,
    EmployerChangesStateSelectors
} from './store/EmployerChanges/';

/**
 * shared services
 */
import {
    APIMockService,
    BackendService,
    UserService
} from './shared/services/';

/**
 * epic specific services
 */
import {DashBoardService} from './epics/Dashboard/services/';
import {StatementsService} from './epics/Billing/services/';
import {PaymentsService} from './epics/Billing/services/';
import {EmployerService} from './epics/Admin/services/';

@NgModule({
    bootstrap       : [AppComponent],
    imports         : [
        // browser specific renderers and core directives e.g. ngIf, ngFor, etc
        BrowserModule,

        // ng2-redux
        NgReduxModule,

        // ng2-translate
        TranslateModule.forRoot({
            provide     : TranslateLoader,
            useFactory  : (http : Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
            deps        : [Http]
        }),

        // shared application resources
        SharedModule,

        // synchronous epic modules
        LoginModule,

        // main application routing config
        AppRoutingModule
    ],
    declarations    : [
        AppComponent,
        NoContentComponent
    ],
    providers       : [
        APIMockService,
        BackendService,
        UserService,
        DashBoardService,
        StatementsService,
        PaymentsService,
        EmployerService,
        UserActions,
        UserStateSelectors,
        NavActions,
        NavStateSelectors,
        DashboardActions,
        DashboardStateSelectors,
        StatementsActions,
        StatementsStateSelectors,
        PaymentActions,
        PaymentsStateSelectors,
        EmployeeChangesActions,
        EmployeeChangesStateSelectors,
        EmployerChangesActions,
        EmployerChangesStateSelectors
    ]
})

/**
 * Implementation of AppModule: Root App Module for entire application
 */
export class AppModule {
    /**
     * AppModule constructor
     */
    constructor(
        private translate   : TranslateService,
        private devTools    : DevToolsExtension,
        private ngRedux     : NgRedux<IAppState>
    ) {
        // force ng2-translate to use english for now
        translate.setTranslation('en', APP_TRANSLATIONS);

        translate.setDefaultLang('en');
        translate.use('en');

        const ENH = (ENV !== 'build:prod' && devTools.isEnabled()) ?
            [ ... enhancers, devTools.enhancer({
                deserializeState : reimmutify
            }) ] :
            enhancers;

        ngRedux.configureStore(ROOT_REDUCER, {}, middleware, enhancers);
    }
}
