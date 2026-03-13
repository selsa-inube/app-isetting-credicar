import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { isettingPerAxiosInstance } from "@api/isettingPersistence";
import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { mapConfirmConstructionEntityToApi } from "./mappers";

const patchConfirmConstruction = async (
  userAccount: string,
  data: IModifyConstructionRequest,
  token: string,
): Promise<ISaveDataResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ConfirmRequestInConstruction",
      "X-User-Name": userAccount,
      Authorization: token,
    },
  };

  const saveData = await patchWithRetries<ISaveDataResponse>(
    `/requests`,
    config,
    mapConfirmConstructionEntityToApi(data) as unknown as string[],
    isettingPerAxiosInstance,
  );

  return saveData;
};

export { patchConfirmConstruction };
