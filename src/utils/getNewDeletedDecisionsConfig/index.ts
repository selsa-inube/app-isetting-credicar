import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { findDecision } from "../destination/findDecision";
import { arraysEqual } from "../destination/arraysEqual";

const getNewDeletedDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
) => {
  if (useCase && !arraysEqual(prevRef, newDecision)) {
    return prevRef
      .filter((decision) => !findDecision(newDecision, decision))
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((decision) => {
          const conditionGroups = decision.conditionGroups
            ? decision.conditionGroups.map((item) => ({
                conditionGroupId:
                  item.conditionGroupId ?? item.ConditionGroupId,
                transactionOperation: ETransactionOperation.DELETE,
                conditionsThatEstablishesTheDecision:
                  item.conditionsThatEstablishesTheDecision?.filter(
                    (condition) => {
                      if (condition.value !== undefined) {
                        return {
                          conditionName: condition.conditionName,
                          value: condition.value,
                          transactionOperation: ETransactionOperation.DELETE,
                        };
                      }
                    },
                  ) as IConditionsTheDecision[],
              }))
            : undefined;
          const validUntil = decision.validUntil
            ? formatDateDecision(decision.validUntil as string)
            : undefined;
          return {
            effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
            validUntil: validUntil,
            value: decision.value,
            transactionOperation: ETransactionOperation.DELETE,
            decisionId: decision.decisionId,
            conditionGroups: conditionGroups,
          };
        });

        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: decisionsByRule,
        };
      });
  }
};

export { getNewDeletedDecisionsConfig };
