import { ILineUnderConstructionRequest } from "@ptypes/creditLines/ILineUnderConstructionRequest";

const mapLineUnderConstructionEntityToApi = (
  data: ILineUnderConstructionRequest,
): ILineUnderConstructionRequest => {
  return {
    abbreviatedName: data.abbreviatedName,
    alias: data.alias,
    descriptionUse: data.descriptionUse,
    rules: data.rules,
    settingRequest: data.settingRequest,
  };
};

export { mapLineUnderConstructionEntityToApi };
