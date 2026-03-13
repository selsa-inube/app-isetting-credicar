import { FormikProps } from "formik";
import { ICompanyEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyEntry";

interface IUseCompanyForm {
  initialValues: ICompanyEntry;
  editDataOption: boolean;
  option: boolean;
  ref: React.ForwardedRef<FormikProps<ICompanyEntry>>;
  onSubmit: ((values: ICompanyEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  initialCompanyData?: ICompanyEntry;
}

export type { IUseCompanyForm };
