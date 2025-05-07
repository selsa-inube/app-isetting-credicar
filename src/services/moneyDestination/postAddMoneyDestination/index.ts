import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";

import { axiosInstance } from "@api/isettingCredicar";
import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";
import { mapAddMoneyDestinationEntityToApi } from "./mappers.ts";

const postAddMoneyDestination = async (
  businessUnit: string,
  data: IRequestMoneyDestination,
): Promise<IRequestMoneyDestination> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddMoneyDestination",
      "X-Business-Unit": businessUnit,
    },
  };

  const newData = await postWithRetries<IRequestMoneyDestination>(
    `/money-destinations`,
    config,
    mapAddMoneyDestinationEntityToApi(data) as unknown as string[],
    axiosInstance,
  );

  return newData;
};

export { postAddMoneyDestination };
