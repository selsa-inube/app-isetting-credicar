import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IConfigDecisions } from "@ptypes/decisions/IConfigDecisions";
import { mapEvaluateRuleByBusinessEntities } from "./mappers";

const evaluateRuleByBusinessUnit = async (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
): Promise<IRules[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "EvaluateRuleByBusinessUnit",
      "X-Business-unit": businessUnits,
    },
  };

  const data: IConfigDecisions[] = await postWithRetries<IConfigDecisions[]>(
    `/crediboard-business-unit-rules`,
    config,
    rulesData as unknown as string[],
    credicarAxiosInstance,
  );

  return mapEvaluateRuleByBusinessEntities(data);
};

export { evaluateRuleByBusinessUnit };
