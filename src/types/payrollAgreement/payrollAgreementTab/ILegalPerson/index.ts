import { IRegisteredContactsByLegalEntity } from "../IRegisteredContactsByEntity";

interface ILegalPerson {
  countryOfIdentityDocument: string;
  countryTaxResidence: string;
  headquarterAddress: string;
  headquarterCity: string;
  identificationDocumentNumber: string;
  identificationDocumentVerificationDigit: string;
  identificationTypeLegalPerson: string;
  legalPersonId: string;
  payingEntityName: string;
  registeredContactsByCustomerLegalEntity?: IRegisteredContactsByLegalEntity[];
  tradename: string;
}

export type { ILegalPerson };
