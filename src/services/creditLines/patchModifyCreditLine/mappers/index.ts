import { IModifyCreditLine } from "@ptypes/creditLines/IModifyCreditLine";

const mappatchModifyCreditEntityToApi = (
  data: IModifyCreditLine,
): IModifyCreditLine => {
  return {
    settingRequest: data.settingRequest,
    lineOfCreditId: data.lineOfCreditId,
    modifyJustification: data.modifyJustification,
    abbreviatedName: data.abbreviatedName,
    alias: data.alias,
    descriptionUse: data.alias,
    rules: data.rules,
  };
};

export { mappatchModifyCreditEntityToApi };
