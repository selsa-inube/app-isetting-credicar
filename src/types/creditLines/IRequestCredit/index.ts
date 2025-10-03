import { ISettingRequest } from "@ptypes/ISettingRequest";
import { IRuleDecision } from "@isettingkit/input";

interface IRequestCredit {
  rules: IRuleDecision[];
  removalJustification?: string;
  settingRequest?: ISettingRequest;
}

export type { IRequestCredit };
