import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";

interface IGeneralInformationFormUI {
  formik: FormikProps<IGeneralInformationEntry>;
  optionsDestination: IServerDomain[];
  autosuggestValue: string;
  editDataOption: boolean;
  icon: JSX.Element | undefined;
  valuesEqual: boolean;
  loading: boolean;
  labelButtonNext: string;
  buttonDisabledState: boolean;
  onButtonClick: () => void;
  onReset: () => void;
  onChange: (name: string, value: string) => void;
}

export type { IGeneralInformationFormUI };
