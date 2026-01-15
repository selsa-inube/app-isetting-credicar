import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";
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
    isaasPerAxiosInstance,
  );

  return saveData;
};

export { postAddRequestInConstruction };
