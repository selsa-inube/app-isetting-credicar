import { ILineUnderConstructionData } from "@ptypes/creditLines/ILineUnderConstructionData";
import { mapLineInConstructionToEntity } from "../mapLineInConstructionToEntity";

const mapLineInConstructionToEntities = (
  enums: ILineUnderConstructionData[],
): ILineUnderConstructionData[] => {
  return enums.map(mapLineInConstructionToEntity);
};

export { mapLineInConstructionToEntities };
