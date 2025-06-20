import { FormikProps } from "formik";
import { IStackAlignItem, IStackDirectionAlignment } from "@inubekit/inubekit";
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
  isMobile: boolean;
  widthStack: string;
  directionStack: IStackDirectionAlignment;
  alignItemsIcon: IStackAlignItem;
  paddingIcon: string;
  onButtonClick: () => void;
  onReset: () => void;
  onChange: (name: string, value: string) => void;
}

export type { IGeneralInformationFormUI };
