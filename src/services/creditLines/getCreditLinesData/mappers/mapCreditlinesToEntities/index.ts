import { ICreditLinesData } from "@ptypes/creditLines/ICreditLinesData";
import { mapCreditLinesToEntity } from "../mapCreditLinesToEntity";

const mapCreditlinesToEntities = (
  enums: ICreditLinesData[],
): ICreditLinesData[] => {
  return enums.map(mapCreditLinesToEntity);
};

export { mapCreditlinesToEntities };
