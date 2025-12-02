import { ETransactionOperation } from "@enum/transactionOperation";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IEntry } from "@ptypes/design/table/IEntry";

const removeDeleteTransactions = (data: IEntry) => {
  if (
    !data ||
    !data.configurationRequestData ||
    !data.configurationRequestData.rules
  ) {
    return data;
  }
  const result = JSON.parse(JSON.stringify(data));

  result.configurationRequestData.rules =
    result.configurationRequestData.rules.filter((rule: IRules) => {
      if (!rule.decisionsByRule || !Array.isArray(rule.decisionsByRule)) {
        return true;
      }

      rule.decisionsByRule = rule.decisionsByRule.filter(
        (decision: IDecisionsByRule) => {
          if (!decision.transactionOperation) {
            return true;
          }

          if (decision.transactionOperation === ETransactionOperation.DELETE) {
            return false;
          }

          decision.conditionGroups = decision.conditionGroups
            ?.map((group) => {
              group.conditionsThatEstablishesTheDecision =
                group.conditionsThatEstablishesTheDecision.filter(
                  (condition) => {
                    if (!condition.transactionOperation) {
                      return true;
                    }
                    return (
                      condition.transactionOperation !==
                      ETransactionOperation.DELETE
                    );
                  },
                );
              return group;
            })
            .filter(
              (group) => group.conditionsThatEstablishesTheDecision.length > 0,
            );
          return (
            decision.conditionGroups && decision.conditionGroups.length > 0
          );
        },
      );

      return rule.decisionsByRule.length > 0;
    });

  return result;
};

export { removeDeleteTransactions };
