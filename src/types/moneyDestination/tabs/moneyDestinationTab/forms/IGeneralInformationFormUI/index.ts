import { FormikProps } from "formik";
import { IStackAlignItem, IStackDirectionAlignment } from "@inubekit/inubekit";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IMessageModal } from "@ptypes/decisions/IMessageModal";

interface IGeneralInformationFormUI {
  formik: FormikProps<IGeneralInformationEntry>;
  optionsDestination: IServerDomain[];
  autosuggestValue: string;
  editDataOption: boolean;
  loading: boolean;
  labelButtonNext: string;
  buttonDisabledState: boolean;
  isMobile: boolean;
  widthStack: string;
  creditLineOptions: IServerDomain[];
  onChangeCheck: (name: string, values: string) => void;
  typeDestinationOptions: IServerDomain[];
  directionStack: IStackDirectionAlignment;
  alignItemsIcon: IStackAlignItem;
  paddingIcon: string;
  showDecisionModal: boolean;
  attentionModal: IMessageModal;
  onToggleAttentionModal: () => void;
  onButtonClick: () => void;
  onChange: (name: string, value: string) => void;
  onReset?: () => void;
}

export type { IGeneralInformationFormUI };
