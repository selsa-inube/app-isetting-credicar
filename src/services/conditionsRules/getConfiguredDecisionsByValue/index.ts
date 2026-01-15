import { AxiosRequestConfig } from "axios";

import { credicarAxiosInstance } from "@api/isettingCredicar";
import { getWithRetries } from "@services/core/getWithRetries";
import { IConfiguredDecisionsByValue } from "@ptypes/creditLines/IConfiguredDecisionsByValue";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { mapGetConfiguredEntities } from "./mappers";

const getConfiguredDecisionsByValue = async (
  rulesName: string,
  decisionValue: string,
  conditionName: string,
  businessUnit: string,
  token: string,
): Promise<IConfiguredDecisions[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": `GetConfiguredDecisionsByDecisionValue`,
      "X-Business-unit": businessUnit,
      Authorization: token,
    },
  };

  const queryParams = new URLSearchParams({
    ruleName: rulesName,
    decisionValue: decisionValue,
    conditionName: conditionName,
  });

  const data: IConfiguredDecisionsByValue =
    await getWithRetries<IConfiguredDecisionsByValue>(
      credicarAxiosInstance,
      `/crediboard-business-unit-rules?${queryParams}`,
      config,
    );

  return mapGetConfiguredEntities(data);
};

export { getConfiguredDecisionsByValue };
