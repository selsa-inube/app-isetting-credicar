import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";
import { IApprovalResponse } from "@ptypes/saveData/IApprovalResponse";
import { IApprovalRequest } from "@ptypes/saveData/IApprovalRequest";
import { mapApprovalRequestEntityToApi } from "./mappers";

const patchApprovalConfiguration = async (
  userAccount: string,
  data: IApprovalRequest,
): Promise<IApprovalResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ApprovalOfAConfigurationRequest",
      "X-User-Name": userAccount,
    },
  };

  const saveData = await patchWithRetries<IApprovalResponse>(
    `/requests`,
    config,
    mapApprovalRequestEntityToApi(data) as unknown as string[],
    isaasPerAxiosInstance,
  );

  return saveData;
};

export { patchApprovalConfiguration };
