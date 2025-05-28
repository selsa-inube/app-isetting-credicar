import { ICity } from "@ptypes/ICity";

const mapCitiesToEntity = (data: ICity): ICity => {
  const newData: ICity = {
    cityCatalogId: String(data.cityCatalogId),
    descriptionUse: String(data.descriptionUse),
    publicCode: String(data.publicCode),
    subdivisionId: String(data.subdivisionId),
  };

  return newData;
};

const mapCitiesToEntities = (enums: ICity[]): ICity[] => {
  return enums.map(mapCitiesToEntity);
};

export { mapCitiesToEntity, mapCitiesToEntities };
