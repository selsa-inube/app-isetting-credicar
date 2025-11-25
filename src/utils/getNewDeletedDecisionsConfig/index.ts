import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { findDecision } from "../destination/findDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { normalizeValueCondition } from "../decisions/normalizeValueCondition";

const getNewDeletedDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
  language: string,
) => {
  if (useCase && !arraysEqual(prevRef, newDecision)) {
    return prevRef
      .filter((decision) => !findDecision(newDecision, decision))
      .map((decision) => {
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
                          value:
                            normalizeValueCondition(
                              condition.enumValues ?? [],
                              language,
                              condition.value,
                            )?.code ?? condition.value,
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
            value:
              normalizeValueCondition(
                condition.enumValues ?? [],
                language,
                condition.value,
              )?.code ?? condition.value,
            transactionOperation: ETransactionOperation.DELETE,
            decisionId: condition.decisionId,
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
