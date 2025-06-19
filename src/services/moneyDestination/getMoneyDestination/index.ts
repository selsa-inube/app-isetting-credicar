import { translateObject } from "@isettingkit/business-rules";
import { AxiosRequestConfig } from "axios";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { configTranslate, enviroment } from "@config/environment";
import { mapMoneyDestinationToEntities } from "./mappers/mapDestinationToEntities";

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

  const shouldTranslate =
    !!enviroment.VITE_LANGUAGE &&
    !!configTranslate.url &&
    !!configTranslate.apiKey;

  if (shouldTranslate) {
    const translatedRaw = await translateObject(
      data,
      enviroment.VITE_LANGUAGE,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configTranslate as any,
    );

    const translatedArray = Array.isArray(translatedRaw)
      ? translatedRaw
      : Object.values(translatedRaw);

    return mapMoneyDestinationToEntities(translatedArray);
  }

  return mapMoneyDestinationToEntities(data);
};

export { getMoneyDestinationData };
