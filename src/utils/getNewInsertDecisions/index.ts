import { ICondition, IRuleDecision } from "@isettingkit/input";
import { TransactionOperation } from "@enum/transactionOperation";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { formatDateDecision } from "../date/formatDateDecision";

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
          conditionsThatEstablishesTheDecision:
            decision.conditionsThatEstablishesTheDecision?.map((condition) => ({
              conditionName: condition.conditionName,
              labelName: condition.labelName,
              value: condition.value,
            })) as ICondition[],
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          value: decision.value,
          transactionOperation: TransactionOperation.INSERT,
        };

        if (decision.validUntil) {
          decisionsByRule.validUntil = formatDateDecision(
            decision.validUntil as string,
          );
        }

        return {
          modifyJustification: `La modificación de la decisión es solicitada por ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: [decisionsByRule],
        };
      });
  }
};

export { getNewInsertDecisions };
