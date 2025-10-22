/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatValueDecision } from "@utils/formatValueDecision";
import { formatDateDecision } from "@utils/date/formatDateDecision";
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
            conditionGroupId: decisionGroup.conditionGroupId,
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
      effectiveFrom: formatDateDecision(decision.effectiveFrom),
      transactionOperation: decision.transactionOperation,
      validUntil: formatDateDecision(decision.validUntil),
      value: decision.value,
    })),
  }));

  return {
    rules: mappedRules,
    settingRequest: data.settingRequest,
  };
};

export { mapEditGeneralPoliciesToApi };
