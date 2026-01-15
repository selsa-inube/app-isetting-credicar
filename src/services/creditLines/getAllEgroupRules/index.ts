import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { getWithRetries } from "@services/core/getWithRetries";
import { IEgroupRuleType } from "@ptypes/creditLines/IEgroupRuleType";
import { IAllEgroupRuleType } from "@ptypes/creditLines/IAllEgroupRuleType";
import { mapAllEgroupRulesToEntities } from "./mappers/mapAllEgroupRulesToEntities";

const getAllEgroupRules = async (
  businessUnits: string,
  token: string,
): Promise<IAllEgroupRuleType[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllEnumEgroupRuleType",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };
  const data: IEgroupRuleType = await getWithRetries<IEgroupRuleType>(
    credicarAxiosInstance,
    `/enumerators-egroup-rule-type`,
    config,
  );

  return data ? mapAllEgroupRulesToEntities(data) : [];
};

export { getAllEgroupRules };
