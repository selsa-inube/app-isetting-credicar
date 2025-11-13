import { IAllEgroupRuleType } from "@ptypes/creditLines/IAllEgroupRuleType";

interface IUseGroupOptions {
  groupRules?: IAllEgroupRuleType[];
  hasErrorGroupRules?: boolean;
}

export type { IUseGroupOptions };
