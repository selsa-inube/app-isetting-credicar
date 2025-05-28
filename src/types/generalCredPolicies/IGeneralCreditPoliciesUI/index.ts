import { ITab } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { ICardData } from "@ptypes/home/ICardData";

interface IGeneralCreditPoliciesUI {
  withoutPolicies: boolean;
  smallScreen: boolean;
  policiesTabs: ITab[];
  descriptionOptions: ICardData;
  smallScreenTab: boolean;
  showPoliciesTab: boolean;
  isSelected: string;
  loadingPolicies: boolean;
  showAddPolicies: boolean;
  onTabChange: (id: string) => void;
  onCloseModal: () => void;
  onPolicies: () => void;
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
