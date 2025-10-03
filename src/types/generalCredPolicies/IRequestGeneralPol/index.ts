import { ISettingRequest } from "@ptypes/ISettingRequest";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IRequestGeneralPol {
  rules: IRuleDecisionExtended[];
  removalJustification?: string;
  settingRequest?: ISettingRequest;
}

export type { IRequestGeneralPol };
