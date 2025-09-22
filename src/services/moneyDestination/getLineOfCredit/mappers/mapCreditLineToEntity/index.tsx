import { ICreditLineData } from "@ptypes/moneyDestination/tabs/ICreditLineData";

const mapCreditLineToEntity = (data: ICreditLineData): ICreditLineData => {
  const lineEntry: ICreditLineData = {
    abbreviatedName: String(data.abbreviatedName),
    descriptionUse: String(data.descriptionUse),
    lineOfCreditId: String(data.lineOfCreditId),
    alias: String(data.alias),
  };

  return lineEntry;
};
export { mapCreditLineToEntity };
