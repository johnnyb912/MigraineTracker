import {Component, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';

@Component({
	selector        : 'payment-method-header',
	templateUrl     : './payment-method-header.component.html',
	styleUrls       : [ './payment-method-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentMethodComponent
 */
export class PaymentMethodHeaderComponent {
	/**
	 * PaymentMethodComponent constructor
	 */
	constructor() {}

	/**
	 * event emitted when payment card is edited
	 * @type {EventEmitter<boolean>}
	 */
	@Output() onEditCard = new EventEmitter<boolean>();

	/**
	 * flag to indicate when a payment card is actively being edited or not
	 * @type {boolean}
	 */
	isEdit : boolean = false;

	/**
	 * event handler for click to change edit view
	 * @param edit
	 */
	editCard(edit : boolean) {
		this.onEditCard.emit(edit);
		this.isEdit = edit;
	}

	/**
	 * icons for use in displaying section icon
	 * @type {{statement: (any|T), edit: (any|T)}}
	 */
	icons : any = {
		statement : require('images/SvgIcons/icon-statement.svg'),
		edit      : require('images/SvgIcons/icon-edit.svg')
	};
}
