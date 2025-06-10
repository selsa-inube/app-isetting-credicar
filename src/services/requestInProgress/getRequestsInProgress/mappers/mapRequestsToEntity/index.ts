import { formatDateTable } from "@utils/date/formatDateTable";
import { requestStatusDescription } from "@utils/requestStatusDescription";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IEnumerators } from "@ptypes/IEnumerators";

const mapRequestsInProgressToEntity = (
  data: IRequestsInProgress,
  enumsRequests?: IEnumerators[],
): IRequestsInProgress => {
  const request: IRequestsInProgress = {
    id: String(data.settingRequestId),
    applicationName: String(data.applicationName),
    businessManagerCode: String(data.businessManagerCode),
    businessUnitCode: String(data.businessUnitCode),
    configurationRequestData: Object(data.configurationRequestData),
    configurationRequestsTraceability: Object(
      data.configurationRequestsTraceability,
    ),
    description: String(data.description),
    entityName: String(data.entityName),
    requestDate: formatDateTable(new Date(String(data.requestDate))),
    requestNumber: String(data.requestNumber),
    requestStatus: enumsRequests
      ? requestStatusDescription(enumsRequests, data.requestStatus)
      : String(data.requestStatus),
    requestStatusCode: String(data.requestStatus),
    settingRequestId: String(data.settingRequestId),
    useCaseName: String(data.useCaseName),
    userManagingConfigurationRequests: Object(
      data.userManagingConfigurationRequests,
    ),
  };
  return request;
};

export { mapRequestsInProgressToEntity };
