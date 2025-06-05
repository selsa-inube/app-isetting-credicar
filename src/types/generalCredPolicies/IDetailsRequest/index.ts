import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IRuleDecision } from "@isettingkit/input";

interface IDetailsRequest {
  data: IEntry;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  defaultSelectedTab: string;
  detailsTabsConfig: IDetailsTabsConfig;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isMoreDetails: boolean;
  isSelected: string;
  moreDetailsData: IEntry;
  showModal: boolean;
  showMoreDetailsModal: boolean;
  textValuesBusinessRules: IRulesFormTextValues;
  onTabChange: (id: string) => void;
  onToggleModal: () => void;
  onToggleMoreDetailsModal: () => void;
  contribQuotaInserted?: IRuleDecision[];
  contribQuotaDeleted?: IRuleDecision[];
  incomeQuotaInserted?: IRuleDecision[];
  incomeQuotaDeleted?: IRuleDecision[];
  scoreModelsInserted?: IRuleDecision[];
  scoreModelsDeleted?: IRuleDecision[];
}

export type { IDetailsRequest };
