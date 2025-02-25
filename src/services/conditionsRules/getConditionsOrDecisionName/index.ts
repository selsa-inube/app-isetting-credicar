import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { axiosInstance } from "@api/isettingCredicar";
import { ICondtionOrDecision } from "@ptypes/decisions/ICondtionOrDecision";

const getConditionsOrDecisionName = async (
  bussinesUnits: string,
  condition: string,
): Promise<ICondtionOrDecision> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchPossibleValue",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: ICondtionOrDecision = await getWithRetries<ICondtionOrDecision>(
    axiosInstance,
    `/crediboard-business-unit-rules/${condition}`,
    config,
  );
  return data;
};

export { getConditionsOrDecisionName };
