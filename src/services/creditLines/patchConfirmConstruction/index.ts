import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";
import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { mapConfirmConstructionEntityToApi } from "./mappers";

const patchConfirmConstruction = async (
  userAccount: string,
  data: IModifyConstructionRequest,
): Promise<ISaveDataResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ConfirmRequestInConstruction",
      "X-User-Name": userAccount,
    },
  };

  const saveData = await patchWithRetries<ISaveDataResponse>(
    `/requests`,
    config,
    mapConfirmConstructionEntityToApi(data) as unknown as string[],
    isaasPerAxiosInstance,
  );

  return saveData;
};

export { patchConfirmConstruction };
