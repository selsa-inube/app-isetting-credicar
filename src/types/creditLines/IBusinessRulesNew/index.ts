import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IUseBusinessRulesNewGeneral } from "../IUseBusinessRulesNewGeneral";

interface IBusinessRulesNew extends IUseBusinessRulesNewGeneral {
  setDecisionData: React.Dispatch<
    React.SetStateAction<IRuleDecisionExtended[]>
  >;
  terms?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  formId?: string;
}

export type { IBusinessRulesNew };
