import { IconRequestError } from "@design/data/iconRequestError";
import { formatDateTable } from "@utils/date/formatDateTable";
import { requestStatus } from "@config/requestStatus";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

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
    requestStatus: (
      <IconRequestError
        status={
          requestStatus[data.requestStatus as string] ?? data.requestStatus
        }
        settingRequestError={data.settingRequestError}
      />
    ),
    requestStatusCode: String(data.requestStatus),
    settingRequestId: String(data.settingRequestId),
    useCaseName: String(data.useCaseName),
    userManagingConfigurationRequests: Object(
      data.userManagingConfigurationRequests,
    ),
    settingRequestError: Object(data.settingRequestError),
  };
  return request;
};

export { mapRequestsInProgressToEntity };
