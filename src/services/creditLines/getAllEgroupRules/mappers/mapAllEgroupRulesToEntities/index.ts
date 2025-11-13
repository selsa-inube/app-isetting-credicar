import { IEgroupRuleType } from "@ptypes/creditLines/IEgroupRuleType";
import { IAllEgroupRuleType } from "@ptypes/creditLines/IAllEgroupRuleType";
import { mapAllEgroupRulesToEntity } from "../mapAllEgroupRulesToEntity";

const mapAllEgroupRulesToEntities = (
  data: IEgroupRuleType,
): IAllEgroupRuleType[] => {
  return data.egroupruletype.map(mapAllEgroupRulesToEntity);
};

export { mapAllEgroupRulesToEntities };
