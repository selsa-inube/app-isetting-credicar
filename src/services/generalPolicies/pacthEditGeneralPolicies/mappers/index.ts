import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";

const mapEditGeneralPoliciesToApi = (
  data: IRequestGeneralPol,
): IRequestGeneralPol => {
  return {
    rules: data.rules,
    settingRequest: data.settingRequest,
  };
};

export { mapEditGeneralPoliciesToApi };
