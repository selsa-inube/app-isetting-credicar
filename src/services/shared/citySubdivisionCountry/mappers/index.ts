import { ICountrySubdivisionCity } from "@ptypes/hooks/ICountrySubdivisionCity";

const mapCitySubdivisionToEntities = (
  data: ICountrySubdivisionCity[],
): ICountrySubdivisionCity[] => {
  return data.map((entry: ICountrySubdivisionCity) => ({
    cityName: String(entry.cityName),
    subdivisionCountry: String(entry.subdivisionCountry),
    countryName: String(entry.countryName),
  }));
};

export { mapCitySubdivisionToEntities };
