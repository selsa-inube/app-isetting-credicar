import { ITab } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";
interface IEditDestinationUI {
  editDestinationTabsConfig: ITab[];
  creditLineDecisions: IRuleDecision[];
  normalizeEvaluateRuleData: IRuleDecision[];
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry> | null>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  initialGeneralInfData: IGeneralInformationEntry;
  isSelected: string;
  requestSteps: IRequestSteps[];
  showRequestProcessModal: boolean;
  saveMoneyDestination: ISaveDataResponse;
  smallScreen: boolean;
  showGeneralInformation: boolean;
  showDecisionsForm: boolean;
  showRequestStatus: string | false | undefined;
  modalData: IModalData;
  showDecision: boolean;
  onOpenModal: () => void;
  onTabChange: (id: string) => void;
  onToggleEditedModal: () => void;
  onButtonClick: () => void;
  onReset: () => void;
  setCreditLineDecisions: (decisions: IRuleDecision[]) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onCloseProcess: () => void;
}

export type { IEditDestinationUI };
