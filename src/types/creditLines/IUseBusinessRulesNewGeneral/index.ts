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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[] | any>>;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  onDecisionsChange?: (decisions: IRuleDecision[]) => void;
  loading?: boolean;
  formId?: string;
  optionsConditionsCSV?: string;
}

export type { IUseBusinessRulesNewGeneral };
