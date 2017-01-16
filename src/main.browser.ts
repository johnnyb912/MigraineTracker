/**
 * handles bootstrapping of the Angular 2.x application
 * targeting browsers as a platform
 */

// Angular provides a set of debug tools that are accessible from any browser's developer console
// By default the debug tools are disabled. You can enable/disable debug tools with these imports
import {enableDebugTools, disableDebugTools} from '@angular/platform-browser';

// enableProdMode disables Angular's development mode,
// which turns off assertions and other checks within the framework
import {enableProdMode, ApplicationRef} from '@angular/core';

/*
 * Providers provided by Angular
 * Note: we use platform-browser-dynamic because we are compiling templates on the fly
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

/*
 * Root App Module
 */
import {AppModule} from './app/app.module';

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let decorateModuleRef = function identity(value : any) { return value; };

// depending on the env mode, enable prod mode and add debugging modules
if (ENV === 'build:prod') {
    // Production

    // disable debug tools
    disableDebugTools();

    // enable production mode
    enableProdMode();
}
else {
    // Enable Angular 2 debug tools that are accessible via browser's developer console
    decorateModuleRef = (modRef) => {
        const APP_REF = modRef.injector.get(ApplicationRef);
        const CMP_REF = APP_REF.components[0];

        let _ng = (<any> window).ng;

        enableDebugTools(CMP_REF);

        (<any> window).ng.probe      = _ng.probe;
        (<any> window).ng.coreTokens = _ng.coreTokens;

        return modRef;
    };
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
platformBrowserDynamic().bootstrapModule(AppModule)
                        .then(decorateModuleRef)
                        .catch(err => console.error(err));
