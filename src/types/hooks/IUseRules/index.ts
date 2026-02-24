import { IAddGenCredPoliciesForms } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesForms";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IRuleState } from "@ptypes/generalCredPolicies/IRuleState";

interface IUseRules {
  formValues: IAddGenCredPoliciesForms;
  rulesData: IRuleState;
  dateVerification: IDateVerification;
}

export type { IUseRules };
