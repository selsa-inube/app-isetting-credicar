import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";

interface IUseBusinessRulesNewGeneral {
  language?: "es" | "en";
  decisionTemplate: IRuleDecision;
  initialDecisions: IRuleDecision[];
  loading?: boolean;
  textValues: IRulesFormTextValues;
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[]>>;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  onDecisionsChange?: (decisions: IRuleDecision[]) => void;
}

export type { IUseBusinessRulesNewGeneral };
