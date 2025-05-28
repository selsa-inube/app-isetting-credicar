import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumerators = async (
  enumCredicar: string,
  bussinesUnits: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetEnum",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    credicarAxiosInstance,
    `/enumerators/${enumCredicar}`,
    config,
  );
  return Array.isArray(data) ? mapEnumToEntities(data) : [];
};

export { getEnumerators };
