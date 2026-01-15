import { AxiosRequestConfig } from "axios";

import { deleteWithRetries } from "@services/core/deleteWithRetries";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";

import { ICancelReqInProcRequest } from "@ptypes/payrollAgreement/requestInProgTab/ICancelReqInProcRequest/index.ts";
import { ICancelReqInProcResponse } from "@ptypes/payrollAgreement/requestInProgTab/ICancelReqInProcResponse/index.ts";
import { mapCancelRequestInProgressToApi } from "./mappers/index.ts";

const cancelRequestInProgress = async (
  businessUnit: string,
  data: ICancelReqInProcRequest,
  token: string,
): Promise<ICancelReqInProcResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "RemoveSettingRequest",
      "X-Business-unit": businessUnit,
      Authorization: token,
    },
  };

  const deleteData = await deleteWithRetries<ICancelReqInProcResponse>(
    `/requests`,
    config,
    mapCancelRequestInProgressToApi(data) as unknown as string[],
    isaasPerAxiosInstance,
  );

  return deleteData;
};

export { cancelRequestInProgress };
