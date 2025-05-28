import { IRuleDecision } from "@isettingkit/input";
import { ISettingRequest } from "../ISettingRequest";

interface IRequestMoneyDestination {
  abbreviatedName?: string;
  descriptionUse?: string;
  iconReference?: string;
  rules?: IRuleDecision[];
  moneyDestinationId?: string;
  modifyJustification?: string;
  removalJustification?: string;
  settingRequest?: ISettingRequest;
}

export type { IRequestMoneyDestination };
