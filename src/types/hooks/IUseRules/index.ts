import { IRuleDecision } from "@isettingkit/input";
import { IAddGenCredPoliciesForms } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesForms";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";

interface IUseRules {
  formValues: IAddGenCredPoliciesForms;
  contributionsPortfolio: IRuleDecision[];
  incomePortfolio: IRuleDecision[];
  dateVerification: IDateVerification;
  scoreModels: IRuleDecision[];
}

export type { IUseRules };
