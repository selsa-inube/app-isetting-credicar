import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IDecision } from "@ptypes/decisions/IDecision";
import { mapEnumeratorsRulesApiToEntity } from "./mappers";

const getEnumeratorsRules = async (
  ruleName: string,
  businessUnits: string,
): Promise<IDecision> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllBusinessRuleCatalogCrediboard",
      "X-Business-unit": businessUnits,
    },
  };

  const queryParams = new URLSearchParams({
    ruleName: ruleName,
  });
  const data: IDecision = await getWithRetries<IDecision>(
    credicarAxiosInstance,
    `/enums/business-rules-catalog/crediboard?${queryParams.toString()}`,
    config,
  );
  return mapEnumeratorsRulesApiToEntity(data);
};

export { getEnumeratorsRules };
