import { IRuleDecision } from "@isettingkit/input";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/generalCredPolicies/IDetailsTabsConfig";

interface IUseDetailsPoliciesModal {
  data: IEntry;
  detailsTabsConfig: IDetailsTabsConfig;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  isMoreDetails?: boolean;
}

export type { IUseDetailsPoliciesModal };
