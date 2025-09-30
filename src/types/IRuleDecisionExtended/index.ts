import { IRuleDecision } from "@isettingkit/input";
import { ILanguage } from "../i18n";

interface IRuleDecisionExtended extends IRuleDecision {
  i18n?: ILanguage;
  language?: string;
  conditionGroups?: {
    ConditionGroupId: string;
    conditionsThatEstablishesTheDecision: {
      conditionName: string;
      value: string;
    }[];
  }[];
}

export type { IRuleDecisionExtended };
