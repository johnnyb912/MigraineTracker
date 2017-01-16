import {Component, Input} from '@angular/core';

@Component({
    selector   : 'section-header',
    templateUrl     : './section-header.component.html',
    styleUrls       : [ './section-header.component.scss' ]
})

export class SectionHeaderComponent {
    constructor () {}

    @Input() title : string;
}
