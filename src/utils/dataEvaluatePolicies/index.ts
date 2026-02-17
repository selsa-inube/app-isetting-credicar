import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const dataEvaluatePolicies = (rule: IRuleDecisionExtended[]) => {
  return rule && rule?.length > 0
    ? rule
        .map((item) => {
          return item.value;
        })
        .join(",")
    : "";
};

export { dataEvaluatePolicies };
