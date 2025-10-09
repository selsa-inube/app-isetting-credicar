import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { ISettingRequest } from "@ptypes/ISettingRequest";

interface IModifyCreditLine {
  lineOfCreditId: string;
  modifyJustification?: string;
  abbreviatedName?: string;
  alias?: string;
  descriptionUse?: string;
  rules?: IRules[];
  settingRequest: ISettingRequest;
}

export type { IModifyCreditLine };
