import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const mapSavePayrollAgreementEntityToApi = (
  data: ISaveDataRequest,
): ISaveDataRequest => {
  return {
    applicationName: data.applicationName,
    businessManagerCode: data.businessManagerCode,
    businessUnitCode: data.businessUnitCode,
    description: data.description,
    entityName: data.entityName,
    requestDate: data.requestDate,
    useCaseName: data.useCaseName,
    configurationRequestData: data.configurationRequestData,
  };
};

export { mapSavePayrollAgreementEntityToApi };
