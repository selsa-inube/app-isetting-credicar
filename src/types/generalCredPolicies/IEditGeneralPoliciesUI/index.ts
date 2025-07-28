import { FormikProps } from "formik";
import { ITab } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IDecisionsGeneralEntry } from "../forms/IDecisionsGeneralEntry";

interface IEditGeneralPoliciesUI {
  filteredTabsConfig: ITab[];
  contributionsPortfolio: IRuleDecision[];
  isSelected: string;
  requestSteps: IRequestSteps[];
  loading: boolean;
  showPendingReqModal: boolean;
  showDateModal: boolean;
  showRequestProcessModal: boolean;
  saveGeneralPolicies: ISaveDataResponse;
  smallScreen: boolean;
  formValues: IDecisionsGeneralEntry;
  initialDecisionsData: IDecisionsGeneralEntry;
  decisionsGeneralReference: React.RefObject<
    FormikProps<IDecisionsGeneralEntry>
  >;
  incomePortfolio: IRuleDecision[];
  scoreModels: IRuleDecision[];
  showDecisionsGeneral: boolean;
  showIncomePort: boolean;
  showContributions: boolean;
  showScoreModels: boolean;
  showGoBackModal: boolean;
  isRequestStatusModal: boolean;
  heightContPageContribut: string;
  heightContPageIncome: string;
  heightContPageScoreModels: string;
  onEditedModal: () => void;
  setShowReciprocity: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFactor: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleDateModal: () => void;
  onGoBack: () => void;
  onCloseGoBackModal: () => void;
  setIncomePortfolio: (decisions: IRuleDecision[]) => void;
  setScoreModels: (decisions: IRuleDecision[]) => void;
  onTabChange: (id: string) => void;
  onReset: () => void;
  setContributionsPortfolio: (decisions: IRuleDecision[]) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onCloseProcess: () => void;
  normalizeEvaluateRuleData?: IRuleDecision[];
  normalizedContributions?: IRuleDecision[];
  normalizedIncome?: IRuleDecision[];
  normalizedScoreModels?: IRuleDecision[];
}

export type { IEditGeneralPoliciesUI };
