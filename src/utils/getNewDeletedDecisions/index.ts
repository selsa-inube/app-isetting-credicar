import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { formatDateDecision } from "../date/formatDateDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { translationToEnum } from "../translationToEnum";

const getNewDeletedDecisions = (
  user: string,
  prevRef: React.MutableRefObject<IRules[]>,
  currentPortfolio: IRules[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, currentPortfolio)) {
    return prevRef.current
      .filter((decision) => !findDecision(prevRef.current, decision))
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const conditionGroups = condition.conditionGroups
            ? condition.conditionGroups.map((item) => ({
                conditionGroupId: item.ConditionGroupId,
                transactionOperation: ETransactionOperation.DELETE,
                conditionsThatEstablishesTheDecision:
                  item.conditionsThatEstablishesTheDecision?.filter(
                    (condition) => {
                      if (condition.value !== undefined) {
                        return {
                          conditionName:
                            translationToEnum[condition.conditionName] ??
                            condition.conditionName,
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
            effectiveFrom: dateFrom
              ? formatDateDecision(dateFrom)
              : formatDateDecision(condition.effectiveFrom as string),
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

export { getNewDeletedDecisions };
