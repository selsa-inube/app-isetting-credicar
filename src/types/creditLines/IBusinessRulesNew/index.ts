import { IRuleDecision } from "@isettingkit/input";
import { IUseBusinessRulesNewGeneral } from "../IUseBusinessRulesNewGeneral";

interface IBusinessRulesNew extends IUseBusinessRulesNewGeneral {
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[]>>;
  terms?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  formId?: string;
}

export type { IBusinessRulesNew };
