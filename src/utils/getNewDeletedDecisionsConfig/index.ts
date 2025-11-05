import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";

const getNewDeletedDecisionsConfig = (
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
) => {
  if (!arraysEqual(prevRef, newDecision)) {
    console.log("😈 hook", { prevRef, newDecision });
    return prevRef
      .filter((decision) => !findDecision(newDecision, decision))
      .map((decision) => {
        console.log("   📒 hook - map", { decision });
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const conditionGroups = condition.conditionGroups
            ? condition.conditionGroups.map((item) => ({
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
          const validUntil = condition.validUntil
            ? formatDateDecision(condition.validUntil as string)
            : undefined;

          return {
            effectiveFrom: formatDateDecision(
              condition.effectiveFrom as string,
            ),
            validUntil: validUntil,
            value: condition.value,
            transactionOperation: ETransactionOperation.DELETE,
            decisionId: condition.decisionId,
            conditionGroups: conditionGroups,
          };
        });

        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: [decisionsByRule],
        };
      });
  }
};

export { getNewDeletedDecisionsConfig };
