//types.ts

export type FooterProps = {
    year: number;
  };
  
  // types.ts
export interface CardFormData {
  fullName: string
  cardNumber: string
  expiry: string
  cvv: string
  cardType: string
}

export interface Card extends CardFormData {
  last4: string
  isDefault: boolean
}
