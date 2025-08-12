import { IRuleDecision } from "@isettingkit/input";
import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { formatDateDecision } from "../date/formatDateDecision";
import { translationToEnum } from "../translationToEnum";

const getNewInsertDecisions = (
  user: string,
  prevRef: React.MutableRefObject<IRuleDecision[]>,
  currentPortfolio: IRuleDecision[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, currentPortfolio)) {
    return currentPortfolio
      .filter((decision) => !findDecision(prevRef.current, decision))
      .map((decision) => {
        const decisionsByRule: IRuleDecision = {
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          value: decision.value,
          transactionOperation: ETransactionOperation.INSERT,
        };

        if (decision.conditionsThatEstablishesTheDecision) {
          decisionsByRule.conditionsThatEstablishesTheDecision =
            decision.conditionsThatEstablishesTheDecision?.filter(
              (condition) => {
                if (condition.value !== undefined) {
                  return {
                    conditionName:
                      translationToEnum[condition.conditionName] ??
                      condition.conditionName,
                    labelName: condition.labelName,
                    value: condition.value,
                  };
                }
              },
            );
        }

        if (decision.validUntil) {
          decisionsByRule.validUntil = formatDateDecision(
            decision.validUntil as string,
          );
        }

        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: [decisionsByRule],
        };
      });
  }
};

export { getNewInsertDecisions };
