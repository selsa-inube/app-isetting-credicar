import { IConfigurationRequestsTraceability } from "@ptypes/requestInProgress/IConfigRequestsTraceability";
import { IUserManConfigRequests } from "@ptypes/requestInProgress/IUserManConfigRequests";
import { ISettingRequestError } from "@ptypes/requestInProgress/ISettingRequestError";

interface ILineUnderConstructionData {
  applicationName: string;
  businessManagerCode: string;
  businessManagerName: string;
  businessUnitCode: string;
  businessUnitName: string;
  configurationRequestData: string;
  configurationRequestsTraceability: IConfigurationRequestsTraceability[];
  description: string;
  entityName: string;
  requestDate: string;
  requestNumber: string;
  requestStatus: string;
  settingRequestError: ISettingRequestError[];
  settingRequestId: string;
  useCaseName: string;
  userManagingConfigurationRequests: IUserManConfigRequests[];
  id?: string;
}

export type { ILineUnderConstructionData };
