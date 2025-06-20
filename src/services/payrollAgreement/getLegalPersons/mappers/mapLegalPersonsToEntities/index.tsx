import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { mapLegalPersonsToEntity } from "../mapLegalPersonsToEntity";

const mapLegalPersonsToEntities = (data: ILegalPerson[]): ILegalPerson[] => {
  return data.map(mapLegalPersonsToEntity);
};

export { mapLegalPersonsToEntities };
