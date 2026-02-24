import { IConfigurationRequestsTraceability } from "@ptypes/requestInProgress/IConfigRequestsTraceability";

interface IModifyRequestResponse {
  modifyJustification: string;
  settingRequestId: string;
  configurationRequestsTraceability?: IConfigurationRequestsTraceability;
}

export type { IModifyRequestResponse };
