import { ICondition, IRuleDecision } from "@isettingkit/input";
import { TransactionOperation } from "@enum/transactionOperation";
import { formatDateDecision } from "../date/formatDateDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";

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
                conditionName: condition.conditionName,
                labelName: condition.labelName,
                value: condition.value,
              };
            }) as ICondition[],
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          value: decision.value,
          transactionOperation: TransactionOperation.DELETE,
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

export { getNewDeletedDecisions };
