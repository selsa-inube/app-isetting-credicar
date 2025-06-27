import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { ERequestStatus } from "@enum/requestStatus";
import { formatDateTable } from "@utils/date/formatDateTable";

const mapRequestsInProgressToEntity = (
  data: IRequestsInProgress,
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
    requestStatus:
      ERequestStatus[data.requestStatus as keyof typeof ERequestStatus] ??
      data.requestStatus,
    settingRequestId: String(data.settingRequestId),
    useCaseName: String(data.useCaseName),
    userManagingConfigurationRequests: Object(
      data.userManagingConfigurationRequests,
    ),
  };
  return request;
};

export { mapRequestsInProgressToEntity };
