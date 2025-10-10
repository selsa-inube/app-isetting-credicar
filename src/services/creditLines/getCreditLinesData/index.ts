import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { getWithRetries } from "@services/core/getWithRetries";
import { ICreditLinesData } from "@ptypes/creditLines/ICreditLinesData";
import { mapCreditlinesToEntities } from "./mappers/mapCreditlinesToEntities";

const getCreditLinesData = async (
  businessUnits: string,
): Promise<ICreditLinesData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllLineOfCredit",
      "X-Business-unit": businessUnits,
    },
  };
  const data: ICreditLinesData[] = await getWithRetries<ICreditLinesData[]>(
    credicarAxiosInstance,
    `/lines-of-credit`,
    config,
  );

  return data ? mapCreditlinesToEntities(data) : [];
};

export { getCreditLinesData };
