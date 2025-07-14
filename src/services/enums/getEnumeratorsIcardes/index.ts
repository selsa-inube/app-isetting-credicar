import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumeratorsIcardes = async (
  enumCredicar: string,
  businessUnits: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetEnumInSpanish",
      "X-Business-unit": businessUnits,
    },
  };
  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    credicarAxiosInstance,
    `/enumerators-icardes/${enumCredicar}`,
    config,
  );

  return mapEnumToEntities(data);
};

export { getEnumeratorsIcardes };
