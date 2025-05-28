import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";
import { IRequestSteps } from "@design/modals/requestProcessModal/types";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";
import { IEditDestinationTabsConfig } from "../tabs/ITabConfig/IEditDestinationTabsConfig";

interface IEditDestinationUI {
  editDestinationTabsConfig: IEditDestinationTabsConfig;
  creditLineDecisions: IRuleDecision[];
  normalizeEvaluateRuleData: IRuleDecision[];
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry>>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  initialGeneralInfData: IGeneralInformationEntry;
  isSelected: string;
  requestSteps: IRequestSteps[];
  loading: boolean;
  showPendingReqModal: boolean;
  showRequestProcessModal: boolean;
  saveMoneyDestination: ISaveDataResponse;
  smallScreen: boolean;
  onTabChange: (id: string) => void;
  onButtonClick: () => void;
  onReset: () => void;
  setCreditLineDecisions: (decisions: IRuleDecision[]) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
}

export type { IEditDestinationUI };
