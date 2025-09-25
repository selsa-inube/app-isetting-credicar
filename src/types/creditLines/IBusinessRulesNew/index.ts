import { IUseBusinessRulesNewGeneral } from "../IUseBusinessRulesNewGeneral";

interface IBusinessRulesNew extends IUseBusinessRulesNewGeneral {
  terms?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
}

export type { IBusinessRulesNew };
