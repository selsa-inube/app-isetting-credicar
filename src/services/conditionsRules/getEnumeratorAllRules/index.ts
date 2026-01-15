import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { mapEnumeratorsRulesApiToEntities } from "./mappers";

const getEnumeratorAllRules = async (
  rulesName: string,
  ruleCatalog: string,
  catalogAction: string,
  businessUnits: string,
  token: string,
): Promise<IDecisionData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": `GetAllBusinessRuleCatalog${catalogAction}`,
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };

  const queryParams = new URLSearchParams({
    ruleName: rulesName,
  });

  const data: IDecisionData[] = await getWithRetries<IDecisionData[]>(
    credicarAxiosInstance,
    `/enums/business-rules-catalog/${ruleCatalog}?${queryParams}`,
    config,
  );

  return mapEnumeratorsRulesApiToEntities(data);
};

export { getEnumeratorAllRules };
