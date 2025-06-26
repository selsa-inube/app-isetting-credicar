import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { IEnumerators } from "@ptypes/IEnumerators";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumeratorsRequest = async (
  enumRequest: string,
  bussinesUnits: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetEnum",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    queryProcessAxiosInstance,
    `/enumerators/${enumRequest}`,
    config,
  );

  return mapEnumToEntities(data);
};

export { getEnumeratorsRequest };
