import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IDecision } from "@ptypes/decisions/IDecision";
import { mapEnumeratorsRulesApiToEntity } from "./mappers";

const getEnumeratorsRules = async (
  ruleName: string,
  ruleCatalog: string,
  catalogAction: string,
  businessUnits: string,
): Promise<IDecision> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": `GetByIdBusinessRuleCatalog${catalogAction}`,
      "X-Business-unit": businessUnits,
    },
  };

  const data: IDecision = await getWithRetries<IDecision>(
    credicarAxiosInstance,
    `/enums/business-rules-catalog/${ruleCatalog}/${ruleName}`,
    config,
  );

  return mapEnumeratorsRulesApiToEntity(data);
};

export { getEnumeratorsRules };
