import { ICreditLineData } from "@ptypes/moneyDestination/tabs/ICreditLineData";
import { mapCreditLineToEntity } from "../mapCreditLineToEntity";

const mapCreditLineToEntities = (
  enums: ICreditLineData[],
): ICreditLineData[] => {
  return enums.map(mapCreditLineToEntity);
};

export { mapCreditLineToEntities };
