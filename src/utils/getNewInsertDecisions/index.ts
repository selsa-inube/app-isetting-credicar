import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { formatDateDecision } from "../date/formatDateDecision";
import { translationToEnum } from "../translationToEnum";

const getNewInsertDecisions = (
  user: string,
  prevRef: React.MutableRefObject<IRuleDecisionExtended[]>,
  currentPortfolio: IRuleDecisionExtended[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, currentPortfolio)) {
    return currentPortfolio
      .filter((decision) => !findDecision(prevRef.current, decision))
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const conditionGroups = condition.conditionGroups
            ? condition.conditionGroups.map((item) => ({
                conditionGroupId: item.ConditionGroupId,
                transactionOperation: ETransactionOperation.INSERT,
                conditionsThatEstablishesTheDecision:
                  item.conditionsThatEstablishesTheDecision?.filter(
                    (condition) => {
                      if (condition.value !== undefined) {
                        return {
                          conditionName:
                            translationToEnum[condition.conditionName] ??
                            condition.conditionName,
                          value: condition.value,
                          transactionOperation: ETransactionOperation.INSERT,
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
            transactionOperation: ETransactionOperation.INSERT,
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

export { getNewInsertDecisions };
