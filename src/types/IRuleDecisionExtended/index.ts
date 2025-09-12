import { IRuleDecision } from "@isettingkit/input";
import { ILanguage } from "../i18n";

interface IRuleDecisionExtended extends IRuleDecision {
  i18n?: ILanguage;
}

export type { IRuleDecisionExtended };
