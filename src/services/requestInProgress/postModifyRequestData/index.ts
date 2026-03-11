import { AxiosRequestConfig } from "axios";
import { isettingPerAxiosInstance } from "@api/isettingPersistence";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { IModifyRequestData } from "@ptypes/requestInProgress/IModifyRequestData";
import { IModifyRequestResponse } from "@ptypes/requestInProgress/IModifyRequestResponse";

const postModifyRequestData = async (
  userAccount: string,
  data: IModifyRequestData,
  token: string,
): Promise<IModifyRequestResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyRequestData",
      "X-User-Name": userAccount,
      Authorization: token,
    },
  };

  const saveData = await patchWithRetries<IModifyRequestData>(
    `/requests`,
    config,
    data as unknown as string[],
    isettingPerAxiosInstance,
  );

  return saveData;
};

export { postModifyRequestData };
