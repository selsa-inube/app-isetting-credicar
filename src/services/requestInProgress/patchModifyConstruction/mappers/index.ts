import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

const mapModifyConstructionEntityToApi = (
  data: IModifyConstructionRequest,
): IModifyConstructionRequest => {
  return {
    settingRequestId: data.settingRequestId,
    configurationRequestData: data.configurationRequestData,
  };
};

export { mapModifyConstructionEntityToApi };
