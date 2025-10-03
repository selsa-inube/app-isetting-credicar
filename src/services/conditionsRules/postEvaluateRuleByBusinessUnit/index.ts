import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { mapEvaluateRuleByBusinessEntities } from "./mappers";

const evaluateRuleByBusinessUnit = async (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
): Promise<IRules[] | undefined> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "EvaluteRuleByBusinessUnit",
      "X-Business-unit": businessUnits,
    },
  };

  const data: IRules[] | undefined = await postWithRetries<
    IRules[] | undefined
  >(
    `/crediboard-business-unit-rules`,
    config,
    rulesData as unknown as string[],
    credicarAxiosInstance,
  );

  return mapEvaluateRuleByBusinessEntities(data);
};

export { evaluateRuleByBusinessUnit };
