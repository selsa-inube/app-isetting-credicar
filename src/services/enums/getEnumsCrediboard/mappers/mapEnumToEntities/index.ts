import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntity } from "../mapEnumToEntity";

const mapEnumToEntities = (enums: IEnumerators[]): IEnumerators[] => {
  return enums.map(mapEnumToEntity) ?? [];
};

export { mapEnumToEntities };
