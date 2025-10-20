import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { mapEvaluateRuleByBusinessEntities } from "./mappers";

const evaluateRuleByBusinessUnit = async (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
): Promise<IRuleDecisionExtended[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "EvaluateRuleByBusinessUnit",
      "X-Business-unit": businessUnits,
    },
  };

  const data: IRuleDecisionExtended[] = await postWithRetries<
    IRuleDecisionExtended[]
  >(
    `/crediboard-business-unit-rules`,
    config,
    rulesData as unknown as string[],
    credicarAxiosInstance,
  );

  return mapEvaluateRuleByBusinessEntities(data);
};

export { evaluateRuleByBusinessUnit };
