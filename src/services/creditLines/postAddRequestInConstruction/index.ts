import { AxiosRequestConfig } from "axios";
import { isettingPerAxiosInstance } from "@api/isettingPersistence";
import { postWithRetries } from "@services/core/postWithRetries";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { mapSaveAddRequestEntityToApi } from "./mappers/mapSaveAddRequestEntityToApi";

const postAddRequestInConstruction = async (
  userAccount: string,
  data: ISaveDataRequest,
  token: string,
): Promise<ISaveDataResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddARequestInConstruction",
      "X-User-Name": userAccount,
      Authorization: token,
    },
  };

  const saveData = await postWithRetries<ISaveDataResponse>(
    `/requests`,
    config,
    mapSaveAddRequestEntityToApi(data) as unknown as string[],
    isettingPerAxiosInstance,
  );

  return saveData;
};

export { postAddRequestInConstruction };
