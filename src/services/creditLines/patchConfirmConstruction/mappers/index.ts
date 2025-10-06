import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

const mapConfirmConstructionEntityToApi = (
  data: IModifyConstructionRequest,
): IModifyConstructionRequest => {
  return {
    settingRequestId: data.settingRequestId,
    configurationRequestData: data.configurationRequestData,
  };
};

export { mapConfirmConstructionEntityToApi };
