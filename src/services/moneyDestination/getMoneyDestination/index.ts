import { AxiosRequestConfig } from "axios";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { mapMoneyDestinationToEntities } from "./mappers/mapDestinationToEntities";

const getMoneyDestinationData = async (
  businessUnits: string,
  token: string,
): Promise<IMoneyDestinationData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllMoneyDestination",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };
  const data: IMoneyDestinationData[] = await getWithRetries<
    IMoneyDestinationData[]
  >(credicarAxiosInstance, `/money-destinations`, config);

  return data ? mapMoneyDestinationToEntities(data) : [];
};

export { getMoneyDestinationData };
