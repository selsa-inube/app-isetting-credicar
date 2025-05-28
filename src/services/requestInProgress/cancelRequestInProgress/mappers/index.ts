import { ICancelReqInProcRequest } from "@ptypes/payrollAgreement/requestInProgTab/ICancelReqInProcRequest";

const mapCancelRequestInProgressToApi = (
  process: ICancelReqInProcRequest,
): Record<string, string | number | object> => {
  return {
    removeSettingRequest: [
      {
        settingRequestId: process.settingRequestId,
        requestNumber: process.requestNumber,
        removalJustification: process.removalJustification,
      },
    ],
  };
};

export { mapCancelRequestInProgressToApi };
