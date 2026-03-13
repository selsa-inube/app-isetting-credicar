import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";

interface IUsePayrollData {
  id?: string;
  requestNumber?: string;
  option?: string;
  payrollData: IPayrollAgreementData;
}

export type { IUsePayrollData };
