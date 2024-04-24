export interface ValidateCredit {
  customerId: string;
  identificationType: string;
  identificationNumber: string;
  names: string;
  lastName: string;
  secondLastName: string;
  birthday: string;
  sex: string;
  gender: string;
  level: string;
  segment: string;
  contactType: any[];
  accountId: string;
  bankCode: string;
  bankAccountNumber: string;
  cardNumber: string;
  serviceNumber: any[];
  totalAmount: string;
  employeeId: string;
  employeeCode: string;
  userName: string;
  orgName: string;
  orgId: string;
  region: string;
  accountType: string;
  paymentMethod: string;
  validateProject: boolean;
  bussinessSerialNo: string;
  marriedStatus: string;
  cardType: string;
  ownFullName: string;
  offering: Offering[];
  numeroServicio: string;
  CVVNumber: string;
  cashResource: boolean;
  sellResource: string;
  address: any[];
}

export interface Offering {
  offeringId: string;
  offeringCode: string;
  offeringCategory: string;
  offeringName: string;
  isPrimary: string;
  price: string;
  property: any[];
}
