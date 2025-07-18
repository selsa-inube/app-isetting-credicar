import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { ICity } from "@ptypes/ICity";
import { mapCitiesToEntities } from "./mappers";

const getCitiesData = async (): Promise<ICity[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllCityCatalog",
    },
  };
  const data: ICity[] = await getWithRetries<ICity[]>(
    isaasQueryAxiosInstance,
    `/cities-catalog`,
    config,
  );
  return Array.isArray(data) ? mapCitiesToEntities(data) : [];
};

export { getCitiesData };
