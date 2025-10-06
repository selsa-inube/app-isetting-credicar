import { ISettingRequestError } from "@ptypes/requestInProgress/ISettingRequestError";

interface IIconRequestError {
  status: string;
  settingRequestError?: ISettingRequestError[];
}

export type { IIconRequestError };
