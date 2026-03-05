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
  option: boolean,
  dateFrom?: string,
  rule?: string,
) => {
  const normalizedCurrent = current.map((curr) => ({
    ...curr,
    ruleName: curr.ruleName ?? rule,
  }));
  const decisionsToProcess = option
    ? normalizedCurrent
    : !arraysEqual(prevRef.current, current)
      ? current.filter((decision) => !findDecision(prevRef.current, decision))
      : undefined;

  if (!decisionsToProcess) return;

  return decisionsToProcess.map((decision) => {
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
                ...(!option && {
                  transactionOperation: ETransactionOperation.INSERT,
                }),
              })) as IConditionsTheDecision[]) || [];

          return {
            ...(!option && {
              transactionOperation:
                conditionsThatEstablishesTheDecision.length > 0
                  ? ETransactionOperation.INSERT
                  : undefined,
            }),
            conditionsThatEstablishesTheDecision,
          };
        })
        .filter(
          (group: IConditionGroups) =>
            (group.conditionsThatEstablishesTheDecision?.length ?? 0) > 0,
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
      ...(!option && {
        transactionOperation: ETransactionOperation.INSERT,
      }),
      ...(conditionGroups && { conditionGroups }),
    };

    return {
      ...(!option && {
        modifyJustification: `${decisionsLabels.modifyJustification} ${decision.ruleName}`,
      }),
      ruleName: decision.ruleName ?? rule,
      decisionsByRule: [decisionObject],
    };
  });
};
export { getNewInsertDecisions };
