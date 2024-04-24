import {Project} from '../../../interfaces/product-order/project.ts';
import {Order} from '../../../interfaces/product-order/order.ts';
import {ValidateCredit} from '../../../interfaces/product-order/validate-credit.ts';

export interface ProjectOrder {
  //informacion original registrada en la base
  project: Project;
  // información de la orden recolectada por pda one
  order: Order;
  // request de validación de crédito
  validateCredit: ValidateCredit;
}