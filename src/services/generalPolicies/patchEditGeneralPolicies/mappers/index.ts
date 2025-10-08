/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatValueDecision } from "@utils/formatValueDecision";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";

const mapEditGeneralPoliciesToApi = (
  data: IRequestGeneralPol,
): IRequestGeneralPol => {
  const mappedRules = data.rules.map((rule: any) => ({
    ...rule,
    decisionsByRule: rule.decisionsByRule.map((decision: any) => ({
      ...decision,
      conditionGroups: decision.conditionGroups
        ? decision.conditionGroups.map((decisionGroup: IConditionGroups) => ({
            ...decisionGroup,
            conditionGroupId: decisionGroup.ConditionGroupId,
            transactionOperation: decisionGroup.transactionOperation,
            conditionsThatEstablishesTheDecision:
              decision.conditionsThatEstablishesTheDecision
                ? decision.conditionsThatEstablishesTheDecision.map(
                    (condition: any) => ({
                      ...condition,
                      value: formatValueDecision(condition.value),
                      conditionName: condition.conditionName,
                      transactionOperation: condition.transactionOperation,
                    }),
                  )
                : undefined,
          }))
        : undefined,
      decisionId: decision.decisionId,
      descriptionOfChange: decision.descriptionOfChange,
      effectiveFrom: decision.effectiveFrom,
      transactionOperation: decision.transactionOperation,
      validUntil: decision.validUntil,
      value: decision.value,
    })),
  }));

  return {
    rules: mappedRules,
    settingRequest: data.settingRequest,
  };
};

export { mapEditGeneralPoliciesToApi };
