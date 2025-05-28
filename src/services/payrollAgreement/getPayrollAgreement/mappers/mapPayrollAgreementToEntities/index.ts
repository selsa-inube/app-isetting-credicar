import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { mapPayrollAgreementToEntity } from "../mapPayrollAgreementToEntity";

const mapPayrollAgreementToEntities = (
  enums: IPayrollAgreementData[],
): IPayrollAgreementData[] => {
  return enums.map(mapPayrollAgreementToEntity);
};

export { mapPayrollAgreementToEntities };
