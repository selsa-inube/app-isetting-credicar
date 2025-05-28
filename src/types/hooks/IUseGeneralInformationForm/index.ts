import { FormikProps } from "formik";
import { IGeneralInformationEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayroll";
import { IServerDomain } from "@ptypes/IServerDomain";

interface IUseGeneralInformationForm {
  initialValues: IGeneralInformationEntry;
  ref: React.ForwardedRef<FormikProps<IGeneralInformationEntry>>;
  editDataOption: boolean;
  loading: boolean | undefined;
  sourcesOfIncomeValues: IServerDomain[];
  onSubmit: ((values: IGeneralInformationEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setSourcesOfIncomeValues: React.Dispatch<
    React.SetStateAction<IServerDomain[]>
  >;
  initialGeneralInfData?: IGeneralInformationEntry;
}

export type { IUseGeneralInformationForm };
