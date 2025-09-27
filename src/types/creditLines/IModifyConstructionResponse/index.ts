import { IConfigurationRequestsTraceability } from "@ptypes/requestInProgress/IConfigRequestsTraceability";

interface IModifyConstructionResponse {
  configurationRequestData: Record<string, unknown>;
  settingRequestId: string;
  configurationRequestsTraceability?: IConfigurationRequestsTraceability;
}

export type { IModifyConstructionResponse };
