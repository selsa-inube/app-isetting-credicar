import { ISettingRequest } from "@ptypes/ISettingRequest";

interface IRequestCreditLine {
  abbreviatedName: string;
  lineOfCreditId: string;
  settingRequest: ISettingRequest;
  removalJustification?: string;
}

export type { IRequestCreditLine };
