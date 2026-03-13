import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";

interface IUseEditPayrollAgreement {
  data: IPayrollAgreementData;
  loading: boolean;
  option: boolean;
}

export type { IUseEditPayrollAgreement };
