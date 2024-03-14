export enum PaymentMethodType {
  PhoneCall = 'PhoneCallPaymentMethod',
  Zelle = 'ZelleTransferPaymentMethod',
  Square = 'SquareCheckoutPaymentMethod',
}

export interface PaymentMethod {
  id: number;
  resourcetype: PaymentMethodType;
}

export interface PhoneCallPaymentMethod extends PaymentMethod {
  phone: string;
}

export interface ZelleTransferPaymentMethod extends PaymentMethod {
  email: string;
}
