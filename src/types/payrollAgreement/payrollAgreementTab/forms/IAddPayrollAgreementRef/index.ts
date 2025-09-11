import { FormikProps } from "formik";
import { ICompanyEntry } from "../ICompanyEntry";
import { IGeneralInformationEntry } from "../IGeneralInformationPayroll";

interface IAddPayrollAgreementRef {
  company: React.RefObject<FormikProps<ICompanyEntry> | null>;
  generalInformation: React.RefObject<FormikProps<IGeneralInformationEntry> | null>;
}

export type { IAddPayrollAgreementRef };
