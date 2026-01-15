import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IGetConfiguredDecisions } from "@ptypes/decisions/IGetConfiguredDecisions";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { mapGetConfiguredEntities } from "./mappers";

const postGetConfiguredDecisions = async (
  businessUnits: string,
  rulesData: IEvaluateRuleRequest,
  token: string,
): Promise<IConfiguredDecisions[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetConfiguredDecisions",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };

  const data: IGetConfiguredDecisions =
    await postWithRetries<IGetConfiguredDecisions>(
      `/crediboard-business-unit-rules`,
      config,
      rulesData as unknown as string[],
      credicarAxiosInstance,
    );
  return mapGetConfiguredEntities(data);
};

export { postGetConfiguredDecisions };
