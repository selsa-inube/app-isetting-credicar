import { AxiosRequestConfig } from "axios";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";
import { IModifyRequestData } from "@ptypes/requestInProgress/IModifyRequestData";
import { IModifyRequestResponse } from "@ptypes/requestInProgress/IModifyRequestResponse";
import { patchWithRetries } from "@src/services/core/patchWithRetries";

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
    isaasPerAxiosInstance,
  );

  return saveData;
};

export { postModifyRequestData };
