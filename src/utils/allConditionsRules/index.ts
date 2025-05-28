import { IRuleDecision } from "@isettingkit/input";

const allConditionsRules = (ruleData?: IRuleDecision[]) => {
  return (
    ruleData?.flatMap(
      (item) => item?.conditionsThatEstablishesTheDecision ?? [],
    ) ?? []
  );
};

export { allConditionsRules };
