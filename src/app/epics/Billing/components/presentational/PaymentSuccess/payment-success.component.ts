import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-success',
    templateUrl     : './payment-success.component.html',
    styleUrls       : [ './payment-success.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class PaymentSuccessComponent {
    constructor() {}

    icons : any = {
        thumbs_up : require('images/SvgIcons/icon-thumbs-up.svg')
    };
}
