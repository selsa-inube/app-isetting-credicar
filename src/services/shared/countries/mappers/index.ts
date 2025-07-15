import { ICountry } from "@ptypes/ICountry";

const mapCountriesToEntity = (data: ICountry): ICountry => {
  const newData: ICountry = {
    abbreviatedName: String(data.name),
    countryCatalogId: String(data.countryId),
    descriptionUse: String(data.name),
    publicCode: String(data.publicCode),
  };

  return newData;
};

const mapCountriesToEntities = (enums: ICountry[]): ICountry[] => {
  return enums.map(mapCountriesToEntity);
};

export { mapCountriesToEntity, mapCountriesToEntities };
