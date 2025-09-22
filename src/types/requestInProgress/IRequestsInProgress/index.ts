import { IConfigurationRequestsTraceability } from "../IConfigRequestsTraceability";
import { ISettingRequestError } from "../ISettingRequestError";
import { IUserManagingConfigRequests } from "../IUserConfigRequests";

interface IRequestsInProgress {
  applicationName: string;
  businessManagerCode: string;
  businessUnitCode: string;
  configurationRequestData: Record<string, string | number>;
  configurationRequestsTraceability: IConfigurationRequestsTraceability;
  description: string;
  entityName: string;
  requestDate: string;
  requestNumber: string;
  requestStatus: string | React.ReactNode;
  settingRequestId: string;
  useCaseName: string;
  userManagingConfigurationRequests: IUserManagingConfigRequests[];
  id?: string;
  requestStatusCode?: string;
  settingRequestError?: ISettingRequestError[];
}

export type { IRequestsInProgress };
