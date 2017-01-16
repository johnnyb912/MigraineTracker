import {DecisionGroupOption} from '../../User/';
import {PaymentMappingState} from './payment-mapping-state.model';

export interface IPaymentMappingSelection {
    selection   : DecisionGroupOption;
    account     : PaymentMappingState;
}
