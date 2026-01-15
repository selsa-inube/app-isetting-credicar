import { AxiosRequestConfig } from "axios";

import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";
import { deleteWithRetries } from "@services/core/deleteWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { mapDeleteMoneyDestToApi } from "./mappers";

const deleteMoneyDestination = async (
  businessUnit: string,
  data: IRequestMoneyDestination,
  token: string,
): Promise<IRequestMoneyDestination> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "DeleteMoneyDestination",
      "X-Business-unit": businessUnit,
      Authorization: token,
    },
  };

  const deleteData = await deleteWithRetries<IRequestMoneyDestination>(
    `/money-destinations`,
    config,
    mapDeleteMoneyDestToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return deleteData;
};

export { deleteMoneyDestination };
