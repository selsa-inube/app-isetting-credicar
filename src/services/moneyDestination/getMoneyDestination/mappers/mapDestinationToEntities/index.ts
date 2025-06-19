import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { mapMoneyDestinationToEntity } from "../mapDestinationToEntity";

const mapMoneyDestinationToEntities = (
  enums: IMoneyDestinationData[],
): IMoneyDestinationData[] => {
  return enums.map(mapMoneyDestinationToEntity);
};

export { mapMoneyDestinationToEntities };
