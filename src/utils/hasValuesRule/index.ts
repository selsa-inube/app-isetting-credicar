import { IRuleDecision } from "@isettingkit/input";
import { EBooleanText } from "@enum/booleanText";

const hasValuesRule = (rule?: IRuleDecision[]): boolean => {
  if (rule && rule.length > 0) {
    return rule.some((entry) => entry.value === EBooleanText.Y);
  }
  return false;
};

export { hasValuesRule };
