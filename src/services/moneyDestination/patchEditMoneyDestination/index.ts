import { AxiosRequestConfig } from "axios";

import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { mapEditMoneyDestinationEntityToApi } from "./mappers";

const patchEditMoneyDestination = async (
  businessUnit: string,
  data: IRequestMoneyDestination,
): Promise<IRequestMoneyDestination> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyMoneyDestination",
      "X-Business-Unit": businessUnit,
    },
  };

  const newData = await patchWithRetries<IRequestMoneyDestination>(
    `/money-destinations`,
    config,
    mapEditMoneyDestinationEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { patchEditMoneyDestination };
