import { ISettingRequest } from "@ptypes/ISettingRequest";
import { IRuleDecision } from "@isettingkit/input";

interface IRequestGeneralPol {
  rules: IRuleDecision[];
  removalJustification?: string;
  settingRequest?: ISettingRequest;
}

export type { IRequestGeneralPol };
