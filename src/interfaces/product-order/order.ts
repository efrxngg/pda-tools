/**
 * Estas interfaces fueron obtenidas analizando 1400 registros de la base de datos po-prod(description2).
 * fechas de extraccion: 
 * - 2024-04-01 al 2024-04-30(400 rows), 
 * - 2024-05-01 al 2024-05-31(1000 rows).
 * y unificados con https://transform.tools/json-to-typescript
 */
export interface Order {
  customer: Customer;
  images: Images;
  sentValidateCreditEngine: boolean;
  creditEngine: CreditEngine;
}

export interface Customer {
  executive: string;
  facturaResource?: string;
  subscriber: Subscriber[];
  appointment: Appointment;
  deposit: Deposit;
  installAddress: InstallAddress;
  account: Account;
  orderInfo?: OrderInfo;
  groupOfferingInsts: GroupOfferingInst[];
  groupName: string;
  customerId: string;
  supplementarySale: boolean;
  convergencySale: boolean;
  iptvOttSale: boolean;
  fmcSale: boolean;
  changeFmcOffer: boolean;
  convergent: boolean;
  bank: boolean;
  invoice: boolean;
  olderAdult: boolean;
  customerDisability: boolean;
  electronicSignatureFlow: boolean;
  seller?: string;
  distributor?: string;
  groupId?: string;
}

export interface Subscriber {
  serviceNumber: string;
  serviceLan: string;
  writtenLan: string;
  csrUser: string;
  dealerUserFlag: string;
  promotionFlag: string;
  autoControlType: string;
  password: string;
  opType: string;
  deliveryFlag: string;
  property: any[];
  primaryOffer: PrimaryOffer;
  optionalOffer: OptionalOffer[];
  resourceOffer: ResourceOffer[];
}

export interface PrimaryOffer {
  id: string;
  offeringName: string;
  offeringCode: string;
  offeringCategory: string;
  isPrimary: string;
  price: string;
  priceAfterTax: string;
  priceBeforeTax: string;
  offerType: string;
  operType: string;
}

export interface OptionalOffer {
  offeringName?: string;
  offeringCode?: string;
  offeringCategory?: string;
  isPrimary?: string;
  price?: string;
  quantityFe?: string;
  isAditional?: string;
  priceAfterTax?: string;
  recurringFlag: number;
  offerId: string;
  property?: Property[];
}

export interface Property {
  id: string;
  value: string;
}

export interface ResourceOffer {
  offerId: string;
  serial: string;
  skuCode: string;
  quantity: string;
  installment?: Installment;
  oneTimePrice: string;
  property: any[];
  offeringName: string;
  offeringCode: string;
  offeringCategory: string;
  isPrimary: string;
  price: string;
  priceAfterTax: any;
  priceBeforeTax: any;
  offerType: string;
}

export interface Installment {
  planId: string;
  instId: string;
  firstQuota: string;
}

export interface Appointment {
  scheduleDate: string;
  scheduleTime: string;
  bucket: string;
}

export interface Deposit {
  depositAmount: string;
}

export interface InstallAddress {
  formatedAddress: FormatedAddress;
  tecnologyType: string;
}

export interface FormatedAddress {
  standardAddressId: string;
  latitude?: string;
  longitude?: string;
  country: string;
  province: string;
  city: string;
  parish: string;
  sector: string;
  combination: string;
  street: string;
  crossStreet: string;
  block: string;
  houseNo: string;
  reservedField1: string;
  building: string;
  floorNo: string;
  apartamentNo: string;
  reference: string;
}

export interface Account {
  acctId: string;
  accountInformation: AccountInformation;
  address: Address[];
  property: any[];
}

export interface AccountInformation {
  smsNo: string;
  email: string;
  lastName: string;
  secondLastName?: string;
  firstName: string;
  fullName: string;
  paymentType: string;
  paymentMode: string;
  subLanguage: string;
  billCycleType: string;
  creditLimitValue: string;
  autoPaymentChannel: AutoPaymentChannel[];
  billMedium: BillMedium[];
  property: Property2[];
  identification?: string;
}

export interface AutoPaymentChannel {
  bankCode: string;
  paymentMode: string;
  bankAccountType: string;
  bankAccountName: string;
  bankAccountNumber: string;
  creditCardExpiryTime?: string;
  cVVNumber?: string;
  priority?: string;
}

export interface BillMedium {
  type: string;
  contentMode: string;
}

export interface Property2 {
  id: string;
  value: string;
}

export interface Address {
  addressInformation: AddressInformation;
  addressPurpose: AddressPurpose;
}

export interface AddressInformation {
  unformatedAddress: string;
  formatedAddress: FormatedAddress2;
  postalCode?: string;
}

export interface FormatedAddress2 {
  country: string;
  province: string;
  city: string;
  parish: string;
  street: string;
  crossStreet: string;
  block: string;
  houseNo: string;
  reservedField1: string;
  urbanization1: string;
  POBox: string;
  typeOfAddress: string;
  building: string;
  urbanization2: string;
  stage: string;
  reservedField2: string;
  reservedField3: string;
  reservedField4: string;
  reservedField5: string;
  reservedField6: string;
}

export interface AddressPurpose {
  purpose: string;
}

export interface OrderInfo {
  orderBaseInfo: OrderBaseInfo;
  feeItemInfo: FeeItemInfo[];
  property: any[];
}

export interface OrderBaseInfo {
  remark: string;
  reqApplyType: string;
}

export interface FeeItemInfo {
  payMode: string;
  feeType: string;
  amount: string;
}

export interface GroupOfferingInst {
  operType: string;
  primaryFlag: string;
  offeringBasicInfo: OfferingBasicInfo;
  resourceInfo: any;
  property: any[];
}

export interface OfferingBasicInfo {
  offeringId: string;
}

export interface Images {
  imgClienteFirma?: string;
  imgCedulaCliente1?: string;
  imgCedulaCliente2?: string;
  imgFotoLugar: string;
  imgPlanillaSB: string;
  imgFacturaOtros: string;
}

export interface CreditEngine {
  messageDescription: string;
  delayActivation: string;
  depositAmount: string;
  requestId: string;
  secondResponse: string;
  startDate: string;
  messageCreditValidation?: string;
}
