import { AxiosRequestConfig } from "axios";
import { isaasPerAxiosInstance } from "@api/isaasPersistence";
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
    isaasPerAxiosInstance,
  );

  return saveData;
};

export { postModifyRequestData };
