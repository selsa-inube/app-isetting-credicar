import { IEditPayrollAgreementForms } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IEditPayrollAgreementForms";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";

interface IUseManagePayrollCycles {
  initialData: IEditPayrollAgreementForms;
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  isSelected: string;
  extraordinaryPayment: IExtraordinaryCyclesEntry[];
  setExtraordinaryPayment: React.Dispatch<
    React.SetStateAction<IExtraordinaryCyclesEntry[]>
  >;
}

export type { IUseManagePayrollCycles };
