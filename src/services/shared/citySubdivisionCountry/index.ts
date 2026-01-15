import { AxiosRequestConfig } from "axios";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { getWithRetries } from "@services/core/getWithRetries";
import { ICountrySubdivisionCity } from "@ptypes/hooks/ICountrySubdivisionCity";
import { mapCitySubdivisionToEntities } from "./mappers";

const getCitySubdivisionCountry = async (
  countryName: string,
  token: string,
): Promise<ICountrySubdivisionCity[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchCitySubdivisionCountry",
      Authorization: token,
    },
  };

  const queryParams = new URLSearchParams({
    countryName: countryName,
  });

  const data: ICountrySubdivisionCity[] = await getWithRetries<
    ICountrySubdivisionCity[]
  >(isaasQueryAxiosInstance, `/country-catalogs?${queryParams}`, config);

  return mapCitySubdivisionToEntities(data);
};

export { getCitySubdivisionCountry };
