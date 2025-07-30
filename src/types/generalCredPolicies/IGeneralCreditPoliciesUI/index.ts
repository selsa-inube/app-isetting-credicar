import { ITab } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { ICardData } from "@ptypes/home/ICardData";
import { IModalData } from "../IModalData";

interface IGeneralCreditPoliciesUI {
  withoutPolicies: boolean;
  smallScreen: boolean;
  policiesTabs: ITab[];
  descriptionOptions: ICardData;
  smallScreenTab: boolean;
  showPoliciesTab: boolean;
  showrequestTab: boolean;
  isSelected: string;
  loadingPolicies: boolean;
  showAddPolicies: boolean;
  showGoBackModal: boolean;
  modalData: IModalData;
  onTabChange: (id: string) => void;
  handleOpenModal: () => void;
  onCloseGoBackModal: () => void;
  onGoBack: () => void;
  referenceData?: IRuleDecision[];
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  methodsData?: IRuleDecision[];
  additionalDebtorsData?: IRuleDecision[];
  sourcesIncomeData?: IRuleDecision[];
  financialObligData?: IRuleDecision[];
  realGuaranteesData?: IRuleDecision[];
}

export type { IGeneralCreditPoliciesUI };
