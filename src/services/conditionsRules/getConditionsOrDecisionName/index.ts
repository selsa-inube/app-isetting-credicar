import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { ICondtionOrDecision } from "@ptypes/decisions/ICondtionOrDecision";

const getConditionsOrDecisionName = async (
  businessUnits: string,
  condition: string,
  token: string,
): Promise<ICondtionOrDecision> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchPossibleValue",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };
  const data: ICondtionOrDecision = await getWithRetries<ICondtionOrDecision>(
    credicarAxiosInstance,
    `/crediboard-business-unit-rules/${condition}`,
    config,
  );
  return data;
};

export { getConditionsOrDecisionName };
