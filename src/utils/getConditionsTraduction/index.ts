import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";

const getConditionsTraduction = (
  data: IRuleDecisionExtended,
  language: string,
) => {
  const conditionTraduction: IConditionTraduction[] = [];
  data.conditionsThatEstablishesTheDecision?.forEach((cond) => {
    conditionTraduction.push({
      condition: cond.conditionName,
      label:
        cond.i18n?.[language as keyof typeof cond.i18n] ?? cond.conditionName,
    });
  });

  const ruleNameTraduction =
    data.i18n?.[language as keyof typeof data.i18n] ?? data.descriptionUse;

  return { conditionTraduction, ruleNameTraduction };
};

export { getConditionsTraduction };
