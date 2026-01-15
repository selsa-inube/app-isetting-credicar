import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";

import { ITokens } from "@ptypes/ITokens";
import { axiosInstance } from "@api/isaasToken";
import { mapTokensToEntities } from "./mappers";

const getTokens = async (
  businessUnit: string,
  token: string,
): Promise<ITokens[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Business-unit": businessUnit,
      Authorization: token,
    },
  };

  const queryParams = new URLSearchParams({
    businessUnit: businessUnit,
  });

  const data: ITokens[] = await getWithRetries<ITokens[]>(
    axiosInstance,
    `/token-themes?${queryParams.toString()}`,
    config,
  );

  return Array.isArray(data) ? mapTokensToEntities(data) : [];
};

export { getTokens };
