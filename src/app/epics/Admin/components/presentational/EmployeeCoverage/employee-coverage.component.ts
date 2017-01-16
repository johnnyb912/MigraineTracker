import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'employee-coverage',
    templateUrl     : './employee-coverage.component.html',
    styleUrls       : [ './employee-coverage.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of EmployeeCoverageComponent: displays current employee coverage info to user
 */
export class EmployeeCoverageComponent {
    /**
     * EmployeeCoverageComponent constructor
     */
    constructor () {}
}
