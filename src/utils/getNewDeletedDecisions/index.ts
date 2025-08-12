import { ICondition, IRuleDecision } from "@isettingkit/input";
import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { formatDateDecision } from "../date/formatDateDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { translationToEnum } from "../translationToEnum";

const getNewDeletedDecisions = (
  user: string,
  prevRef: React.MutableRefObject<IRuleDecision[]>,
  currentPortfolio: IRuleDecision[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, currentPortfolio)) {
    return prevRef.current
      .filter((decision) => !findDecision(currentPortfolio, decision))
      .map((decision: IRuleDecision) => {
        const decisionsByRule: IRuleDecision = {
          conditionsThatEstablishesTheDecision:
            decision.conditionsThatEstablishesTheDecision?.map((condition) => {
              return {
                conditionName:
                  translationToEnum[condition.conditionName] ??
                  condition.conditionName,
                labelName: condition.labelName,
                value: condition.value,
              };
            }) as ICondition[],
          decisionId: decision.decisionId,
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          value: decision.value,
          transactionOperation: ETransactionOperation.DELETE,
        };

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

export { getNewDeletedDecisions };
