import { IRuleDecision } from "@isettingkit/input";

const hasValuesRule = (rule?: IRuleDecision[]) => {
  return rule && rule.length > 0 ? true : false;
};

export { hasValuesRule };
