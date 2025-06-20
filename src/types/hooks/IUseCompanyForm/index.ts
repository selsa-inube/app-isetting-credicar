import { FormikProps } from "formik";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";

interface IUseCompanyForm {
  initialValues: ICompanyEntry;
  ref: React.ForwardedRef<FormikProps<ICompanyEntry>>;
  onSubmit: ((values: ICompanyEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export type { IUseCompanyForm };
