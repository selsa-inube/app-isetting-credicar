import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { mapEvaluateRuleByBusinessEntities } from "./mappers";

const evaluateRuleByBusinessUnit = async (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
): Promise<IRuleDecisionExtended[] | undefined> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "EvaluteRuleByBusinessUnit",
      "X-Business-unit": businessUnits,
    },
  };

  const data: IRuleDecisionExtended[] | undefined = await postWithRetries<
    IRuleDecisionExtended[] | undefined
  >(
    `/crediboard-business-unit-rules`,
    config,
    rulesData as unknown as string[],
    credicarAxiosInstance,
  );

  return mapEvaluateRuleByBusinessEntities(data);
};

export { evaluateRuleByBusinessUnit };
