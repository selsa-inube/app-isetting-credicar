import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IDecision } from "@ptypes/decisions/IDecision";
import { mapEnumeratorsRulesApiToEntity } from "./mappers";

const getEnumeratorsRules = async (
  ruleName: string,
  bussinesUnits: string,
): Promise<IDecision> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetByIdBusinessRuleCatalog",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IDecision = await getWithRetries<IDecision>(
    credicarAxiosInstance,
    `/enums/business-rules-catalog/${ruleName}`,
    config,
  );
  return mapEnumeratorsRulesApiToEntity(data);
};

export { getEnumeratorsRules };
