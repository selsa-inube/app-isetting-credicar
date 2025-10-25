import { ITab } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";
interface IEditDestinationUI {
  editDestinationTabsConfig: ITab[];
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry> | null>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  initialGeneralInfData: IGeneralInformationEntry;
  isSelected: string;
  requestSteps: IRequestSteps[];
  showRequestProcessModal: boolean;
  saveMoneyDestination: ISaveDataResponse;
  smallScreen: boolean;
  showGeneralInformation: boolean;
  showRequestStatus: string | false | undefined;
  modalData: IModalData;
  showDecision: boolean;
  loading: boolean;
  creditLineValues: IServerDomain[];
  setCreditLineValues: React.Dispatch<React.SetStateAction<IServerDomain[]>>;
  onOpenModal: () => void;
  onTabChange: (id: string) => void;
  onToggleEditedModal: () => void;
  onReset: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onCloseProcess: () => void;
}

export type { IEditDestinationUI };
