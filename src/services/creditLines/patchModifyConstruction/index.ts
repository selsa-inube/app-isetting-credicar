import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { isettingPerAxiosInstance } from "@api/isettingPersistence";
import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { mapModifyConstructionEntityToApi } from "./mappers";

const patchModifyConstruction = async (
  userAccount: string,
  data: IModifyConstructionRequest,
  token: string,
): Promise<IModifyConstructionResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyARequestInConstruction",
      "X-User-Name": userAccount,
      Authorization: token,
    },
  };

  const saveData = await patchWithRetries<IModifyConstructionResponse>(
    `/requests`,
    config,
    mapModifyConstructionEntityToApi(data) as unknown as string[],
    isettingPerAxiosInstance,
  );

  return saveData;
};

export { patchModifyConstruction };
