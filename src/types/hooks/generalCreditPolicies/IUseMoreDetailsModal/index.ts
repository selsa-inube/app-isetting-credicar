import { IRuleDecision } from "@isettingkit/input";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";

interface IUseMoreDetailsModal {
  isSelected: string;
  detailsTabsConfig: IDetailsTabsConfig;
  isMoreDetails: boolean;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  decisionsMinimum: IRuleDecision[];
}

export type { IUseMoreDetailsModal };
