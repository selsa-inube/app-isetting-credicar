import { ICreditLinesData } from "@ptypes/creditLines/ICreditLinesData";

const mapCreditLinesToEntity = (data: ICreditLinesData): ICreditLinesData => {
  const newData: ICreditLinesData = {
    id: String(data.lineOfCreditId),
    abbreviatedName: String(data.abbreviatedName),
    alias: String(data.alias),
    descriptionUse: String(data.descriptionUse),
    lineOfCreditId: String(data.lineOfCreditId),
  };

  return newData;
};

export { mapCreditLinesToEntity };
