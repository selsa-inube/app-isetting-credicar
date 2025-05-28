import { AxiosRequestConfig } from "axios";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getWithRetries } from "@services/core/getWithRetries";
import { axiosInstance } from "@api/isettingCredicar";
import { mapMoneyDestinationToEntities } from "./mappers";
import { translateObject } from "@isettingkit/business-rules";
import { enviroment } from "@config/environment";

const getMoneyDestinationData = async (
  businessUnits: string,
): Promise<IMoneyDestinationData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllMoneyDestination",
      "X-Business-unit": businessUnits,
    },
  };

  const data = await getWithRetries<IMoneyDestinationData[]>(
    axiosInstance,
    `/money-destinations`,
    config,
  );

  const translatedRaw = await translateObject(data, enviroment.VITE_LANGUAGE);

  const translatedArray = Array.isArray(translatedRaw)
    ? translatedRaw
    : Object.values(translatedRaw);

  return mapMoneyDestinationToEntities(translatedArray);
};

export { getMoneyDestinationData };
