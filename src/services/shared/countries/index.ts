import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { ICountry } from "@ptypes/ICountry";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { mapCountriesToEntities } from "./mappers";

const getCountriesData = async (): Promise<ICountry[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllCountryCatalog",
    },
  };
  const data: ICountry[] = await getWithRetries<ICountry[]>(
    isaasQueryAxiosInstance,
    `/country-catalogs`,
    config,
  );
  return Array.isArray(data) ? mapCountriesToEntities(data) : [];
};

export { getCountriesData };
