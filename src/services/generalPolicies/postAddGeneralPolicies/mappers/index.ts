import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";

const mapAddPayrollnEntityToApi = (
  data: IRequestGeneralPol,
): IRequestGeneralPol => {
  return {
    rules: data.rules,
    settingRequest: data.settingRequest,
  };
};

export { mapAddPayrollnEntityToApi };
