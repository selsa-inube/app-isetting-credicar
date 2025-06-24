import { AxiosRequestConfig } from "axios";

import { translateObject } from "@isettingkit/business-rules";
import { getWithRetries } from "@services/core/getWithRetries";
import { IEnumerators } from "@ptypes/IEnumerators";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";
import { configTranslate, enviroment } from "@config/environment";

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

  const translatedRaw = await translateObject(
    data,
    enviroment.VITE_LANGUAGE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    configTranslate! as any,
  );

  const translatedArray = Array.isArray(translatedRaw)
    ? translatedRaw
    : Object.values(translatedRaw);

  return mapEnumToEntities(translatedArray);
};

export { getEnumeratorsRequest };
