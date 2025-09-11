import { ILineUnderConstructionData } from "@ptypes/creditLines/ILineUnderConstructionData";

const mapLineInConstructionToEntity = (
  data: ILineUnderConstructionData,
): ILineUnderConstructionData => {
  const newData: ILineUnderConstructionData = {
    id: String(data.requestNumber),
    applicationName: String(data.applicationName),
    businessManagerCode: String(data.businessManagerCode),
    businessManagerName: String(data.businessManagerName),
    businessUnitCode: String(data.businessUnitCode),
    businessUnitName: String(data.businessUnitName),
    configurationRequestData: String(data.configurationRequestData),
    configurationRequestsTraceability: Object(
      data.configurationRequestsTraceability,
    ),
    description: String(data.description),
    entityName: String(data.entityName),
    requestDate: String(data.requestDate),
    requestNumber: String(data.requestNumber),
    requestStatus: String(data.requestStatus),
    settingRequestError: Object(data.settingRequestError),
    settingRequestId: String(data.settingRequestId),
    useCaseName: String(data.useCaseName),
    userManagingConfigurationRequests: Object(
      data.userManagingConfigurationRequests,
    ),
  };

  return newData;
};

export { mapLineInConstructionToEntity };
