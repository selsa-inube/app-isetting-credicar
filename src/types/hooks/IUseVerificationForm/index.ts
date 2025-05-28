import { IAssistedStep } from "@inubekit/inubekit";
import { IUpdateDataGenPolicies } from "@ptypes/generalCredPolicies/forms/IUpdateDataGenPolicies";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";

interface IUseVerificationForm {
  showRequestProcessModal: boolean;
  saveGeneralPolicies: ISaveDataResponse;
  showPendingReqModal: boolean;
  updatedData: IUpdateDataGenPolicies;
  addGenCredPoliciesSteps: IAssistedStep[];
}

export type { IUseVerificationForm };
