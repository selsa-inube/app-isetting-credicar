import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IUseBusinessRulesNewGeneral } from "../IUseBusinessRulesNewGeneral";

interface IBusinessRulesNew extends IUseBusinessRulesNewGeneral {
  setDecisionData: React.Dispatch<
    React.SetStateAction<IRuleDecisionExtended[]>
  >;
  option: string;
  remunerativerateRule: boolean;
  showAddDecisionModal: boolean;
  ruleLoading: boolean;
  setShowLineModal: React.Dispatch<React.SetStateAction<boolean>>;
  terms?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  formId?: string;
}

export type { IBusinessRulesNew };
