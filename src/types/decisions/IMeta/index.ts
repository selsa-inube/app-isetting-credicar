import { IConditionMeta } from "../IConditionMeta";
import { IRuleMeta } from "../IRuleMeta";

interface IMeta {
  ruleDict?: Record<string, IRuleMeta>;
  conditionDict?: Record<string, IConditionMeta>;
}

export type { IMeta };
