import { FormikProps } from "formik";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";

interface IUseGeneralInformationForm {
  enumData: IEnumerators[];
  initialValues: IGeneralInformationEntry;
  ref: React.ForwardedRef<FormikProps<IGeneralInformationEntry>>;
  editDataOption: boolean;
  loading: boolean | undefined;
  creditLineValues: IServerDomain[];
  showDecisionModal: boolean;
  setShowDecisionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreditLineValues: React.Dispatch<React.SetStateAction<IServerDomain[]>>;
  onSubmit: ((values: IGeneralInformationEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  initialGeneralInfData?: IGeneralInformationEntry;
}

export type { IUseGeneralInformationForm };
