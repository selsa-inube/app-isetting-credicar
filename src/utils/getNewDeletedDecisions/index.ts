import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { formatDateDecision } from "../date/formatDateDecision";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { normalizedCodeList } from "../normalizedCodeList";

const getNewDeletedDecisions = (
  prevRef: React.MutableRefObject<IRuleDecisionExtended[]>,
  current: IRuleDecisionExtended[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, current)) {
    return prevRef.current
      .filter((decision) => !findDecision(current, decision))
      .map((decision) => {
        const conditionGroups =
          decision.conditionGroups && decision.conditionGroups.length > 0
            ? decision.conditionGroups.map(
                (conditionGroup: IConditionGroups) => {
                  const conditionsThatEstablishesTheDecision =
                    (conditionGroup.conditionsThatEstablishesTheDecision
                      ?.filter((condition) => condition.value !== undefined)
                      .map((condition) => ({
                        conditionName: condition.conditionName,
                        value:
                          condition.listOfPossibleValues?.list &&
                          condition.listOfPossibleValues?.list?.length > 0
                            ? normalizedCodeList(
                                condition.value,
                                condition.listOfPossibleValuesHidden?.list,
                              )
                            : condition.value,
                        transactionOperation: ETransactionOperation.DELETE,
                      })) as IConditionsTheDecision[]) || [];

                  return {
                    transactionOperation: ETransactionOperation.DELETE,
                    conditionsThatEstablishesTheDecision,
                  };
                },
              )
            : undefined;

        const validUntil = decision.validUntil
          ? formatDateDecision(decision.validUntil as string)
          : undefined;

        const decisionObject = {
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          validUntil: validUntil,
          value: decision.value,
          transactionOperation: ETransactionOperation.DELETE,
          decisionId: decision.decisionId,
          ...(conditionGroups && { conditionGroups }),
        };

        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${decision.ruleName}`,
          ruleName: decision.ruleName,
          decisionsByRule: [decisionObject],
        };
      });
  }
};

export { getNewDeletedDecisions };
