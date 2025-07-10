import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntity } from "../mapEnumToEntity";
import { IEnumeratorsIncome } from "@ptypes/hooks/IEnumeratorsIncome";

const mapEnumToEntities = (enums: IEnumeratorsIncome): IEnumerators[] => {
  return enums.incometype.map(mapEnumToEntity);
};

export { mapEnumToEntities };
