import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";

const mapLegalPersonsToEntity = (data: ILegalPerson): ILegalPerson => {
  const newData: ILegalPerson = {
    countryOfIdentityDocument: String(data.countryOfIdentityDocument),
    countryTaxResidence: String(data.countryTaxResidence),
    headquarterAddress: String(data.headquarterAddress),
    headquarterCity: String(data.headquarterCity),
    identificationDocumentNumber: String(data.identificationDocumentNumber),
    identificationDocumentVerificationDigit: String(
      data.identificationDocumentVerificationDigit,
    ),
    identificationTypeLegalPerson: String(data.identificationTypeLegalPerson),
    legalPersonId: String(data.legalPersonId),
    legalPersonName: String(data.legalPersonName),
    tradename: String(data.tradename),
    registeredContactsByCustomerLegalEntity: Object(
      data.registeredContactsByCustomerLegalEntity,
    ),
  };

  return newData;
};

export { mapLegalPersonsToEntity };
