import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getListPossibleValues = async (
  businessUnit: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Business-unit": businessUnit,
    },
  };

  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    credicarAxiosInstance,
    `/list-of-possible-values/money-destination`,
    config,
  );

  return mapEnumToEntities(data);
};

export { getListPossibleValues };
