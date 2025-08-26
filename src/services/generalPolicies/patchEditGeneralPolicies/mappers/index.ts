/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatValueDecision } from "@utils/formatValueDecision";
import { translationToEnum } from "@utils/translationToEnum";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";

const mapEditGeneralPoliciesToApi = (
  data: IRequestGeneralPol,
): IRequestGeneralPol => {
  const mappedRules = data.rules.map((rule: any) => ({
    ...rule,
    decisionsByRule: rule.decisionsByRule.map((decision: any) => ({
      ...decision,
      conditionsThatEstablishesTheDecision:
        decision.conditionsThatEstablishesTheDecision
          ? decision.conditionsThatEstablishesTheDecision.map(
              (condition: any) => ({
                ...condition,
                value: formatValueDecision(condition.value),
                conditionName:
                  translationToEnum[condition.conditionName] ||
                  condition.conditionName,
              }),
            )
          : undefined,
    })),
  }));

  return {
    rules: mappedRules,
    settingRequest: data.settingRequest,
  };
};

export { mapEditGeneralPoliciesToApi };
