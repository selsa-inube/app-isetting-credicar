import { AxiosRequestConfig } from "axios";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { mapMoneyDestinationToEntities } from "./mappers";

const getMoneyDestinationData = async (
  bussinesUnits: string,
): Promise<IMoneyDestinationData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllMoneyDestination",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IMoneyDestinationData[] = await getWithRetries<
    IMoneyDestinationData[]
  >(credicarAxiosInstance, `/money-destinations`, config);
  return Array.isArray(data) ? mapMoneyDestinationToEntities(data) : [];
};

export { getMoneyDestinationData };
