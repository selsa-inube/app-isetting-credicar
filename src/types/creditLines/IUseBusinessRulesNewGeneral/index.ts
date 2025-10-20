import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";

interface IUseBusinessRulesNewGeneral {
  language?: "es" | "en";
  decisionTemplate: IRuleDecision;
  initialDecisions: IRuleDecision[];
  option: string;
  textValues: IRulesFormTextValues;
  remunerativerateRule: boolean;
  showAddDecisionModal: boolean;
  setShowLineModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDecisionData: any;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  onDecisionsChange?: (decisions: IRuleDecision[]) => void;
  loading?: boolean;
  formId?: string;
  optionsConditionsCSV?: string;
}

export type { IUseBusinessRulesNewGeneral };
