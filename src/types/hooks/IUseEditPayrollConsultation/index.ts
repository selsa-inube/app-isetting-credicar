import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseEditPayrollConsultation {
  payrollAgreementData: IEntry;
  useCaseEdit?: string;
  option?: string;
  requestType?: string;
}

export type { IUseEditPayrollConsultation };
