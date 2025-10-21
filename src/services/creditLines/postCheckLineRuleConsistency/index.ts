import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { postWithRetries } from "@services/core/postWithRetries";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
import { ICheckedRuleLine } from "@ptypes/creditLines/ICheckedRuleLine";
import { mapCheckLineRuleEntityToApi } from "./mappers/mapCheckLineRuleEntityToApi";

const postCheckLineRuleConsistency = async (
  userAccount: string,
  data: ICheckedRuleLine,
  businessUnit: string,
): Promise<IPostCheckLineRule[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "CheckLineRuleConsistency",
      "X-User-Name": userAccount,
      "X-Business-Unit": businessUnit,
    },
  };

  const saveData = await postWithRetries<IPostCheckLineRule[]>(
    `/lines-of-credit`,
    config,
    mapCheckLineRuleEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );
console.log('postCheckLineRuleConsistency: ', saveData)
  return saveData;
};

export { postCheckLineRuleConsistency };
