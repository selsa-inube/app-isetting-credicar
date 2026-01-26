import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { arraysEqual } from "../destination/arraysEqual";
import { findDecision } from "../destination/findDecision";
import { formatDateDecision } from "../date/formatDateDecision";
import { normalizedCodeList } from "../normalizedCodeList";

const getNewInsertDecisions = (
  prevRef: React.MutableRefObject<IRuleDecisionExtended[]>,
  current: IRuleDecisionExtended[],
  dateFrom?: string,
) => {
  if (!arraysEqual(prevRef.current, current)) {
    return current
      .filter((decision) => !findDecision(prevRef.current, decision))
      .map((decision) => {
        let conditionGroups = undefined;

        if (decision.conditionGroups && decision.conditionGroups.length > 0) {
          const mappedGroups = decision.conditionGroups
            .map((conditionGroup: IConditionGroups) => {
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
                    transactionOperation: ETransactionOperation.INSERT,
                  })) as IConditionsTheDecision[]) || [];

              return {
                transactionOperation:
                  conditionsThatEstablishesTheDecision.length > 0
                    ? ETransactionOperation.INSERT
                    : undefined,
                conditionsThatEstablishesTheDecision,
              };
            })
            .filter(
              (group: IConditionGroups) =>
                group.conditionsThatEstablishesTheDecision.length > 0,
            );

          if (mappedGroups.length > 0) {
            conditionGroups = mappedGroups;
          }
        }

        const validUntil = decision.validUntil
          ? formatDateDecision(decision.validUntil as string)
          : undefined;

        const decisionObject = {
          effectiveFrom: dateFrom
            ? formatDateDecision(dateFrom)
            : formatDateDecision(decision.effectiveFrom as string),
          ...(validUntil && { validUntil }),
          value: decision.value,
          transactionOperation: ETransactionOperation.INSERT,
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

export { getNewInsertDecisions };
