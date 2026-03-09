import { ICompanyEntry } from "../ICompanyEntry";
import { IExtraordinaryCyclesEntry } from "../IExtraordinaryCyclesEntry";
import { IGeneralInformationEntry } from "../IGeneralInformationPayroll";
import { IOrdinaryCyclesEntry } from "../IOrdinaryCyclesEntry";

interface IEditPayrollAgreementForms {
  generalInformation: { isValid: boolean; values: IGeneralInformationEntry };
  ordinaryCycles: { isValid: boolean; values: IOrdinaryCyclesEntry[] };
  extraordinaryCycles: {
    isValid: boolean;
    values: IExtraordinaryCyclesEntry[];
  };
  company?: { isValid: boolean; values: ICompanyEntry };
}

export type { IEditPayrollAgreementForms };
