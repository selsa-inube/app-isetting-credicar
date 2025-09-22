import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { ICreditLineData } from "@ptypes/moneyDestination/tabs/ICreditLineData";
import { mapCreditLineToEntities } from "./mappers/mapCreditLineToEntities";

const getLineOfCreditData = async (
  businessUnits: string,
): Promise<ICreditLineData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllLineOfCredit",
      "X-Business-unit": businessUnits,
    },
  };
  const data: ICreditLineData[] = await getWithRetries<ICreditLineData[]>(
    credicarAxiosInstance,
    `/lines-of-credit`,
    config,
  );

  return mapCreditLineToEntities(data);
};

export { getLineOfCreditData };
