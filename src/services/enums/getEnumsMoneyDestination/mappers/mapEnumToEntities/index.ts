import { IEnumerators } from "@ptypes/IEnumerators";
import { IEnumeratorsDestination } from "@ptypes/hooks/IEnumeratorsDestination";
import { mapEnumToEntity } from "../mapEnumToEntity";

const mapEnumToEntities = (enums: IEnumeratorsDestination): IEnumerators[] => {
  return enums.moneyDestination.map(mapEnumToEntity);
};

export { mapEnumToEntities };
