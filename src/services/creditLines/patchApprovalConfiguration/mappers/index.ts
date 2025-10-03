import { IApprovalRequest } from "@ptypes/saveData/IApprovalRequest";

const mapApprovalRequestEntityToApi = (
  data: IApprovalRequest,
): IApprovalRequest => {
  return {
    requestNumber: data.requestNumber,
    modifyJustification: data.modifyJustification,
    settingRequestId: data.settingRequestId,
  };
};

export { mapApprovalRequestEntityToApi };
