import { ISettingRequest } from "@ptypes/ISettingRequest";
import { ILineUnderConstruction } from "../ILineUnderConstruction";

interface ILineUnderConstructionRequest extends ILineUnderConstruction {
  settingRequest: ISettingRequest;
}

export type { ILineUnderConstructionRequest };
