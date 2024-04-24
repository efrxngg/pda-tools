import {FormatedAddress} from '../interfaces/product-order/order.ts';


export function buildCombination(formatedAddress: FormatedAddress) {
  let {
    combination,
    parish,
    // eslint-disable-next-line prefer-const
    block,
    // eslint-disable-next-line prefer-const
    houseNo,
    // eslint-disable-next-line prefer-const
    crossStreet,
    // eslint-disable-next-line prefer-const
    floorNo,
    street,
    // eslint-disable-next-line prefer-const
    building,
    // eslint-disable-next-line prefer-const 
    reference
  } = formatedAddress;

  combination = combination.split('|')[0];
  crossStreet = crossStreet.split('|')[1];
  parish = parish.split('|')[1];
  street = street.split('|')[1];


  if (combination === '1') {
    return parish + ' -  Mz. ' + block + ' N°: ' + houseNo + ' - ' + reference;
  }
  if (combination === '3') {
    return parish + ' - ' + street + ' Y ' + crossStreet + ' N°: ' + houseNo + ' - ' + reference;
  }
  if (combination === '25') {
    return parish + ' - Edificio: ' + building + ' - Piso: ' + floorNo + ' N°: ' + houseNo + ' - ' + reference;
  }
  if (combination === '305') {
    return parish;
  }
  if (combination === '2') {
    return parish + ' - ' + street + ' Y ' + crossStreet + ' N°: ' + houseNo + ' - ' + reference;
  }
  return parish + ' - ' + street + ' N°. ' + houseNo + ' - ' + reference;

}