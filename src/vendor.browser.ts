// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';

// depending on the env mode...
if (ENV === 'prod') {
    // Production
}
else {
    // Development
}
