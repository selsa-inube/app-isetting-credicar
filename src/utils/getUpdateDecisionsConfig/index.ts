/* eslint-disable @typescript-eslint/no-explicit-any */
import { ETransactionOperation } from "@src/enum/transactionOperation";
import { IConditionsTheDecision } from "@src/types/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@src/types/IRuleDecisionExtended";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { formatDateDecision } from "../date/formatDateDecision";

const getUpdateDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
) => {
  if (!useCase) return;

  const prevDecisions = prevRef.flatMap((group) => group.decisionsByRule ?? []);
  const newDecisions = newDecision.flatMap(
    (group) => group.decisionsByRule ?? [],
  );

  const prevMap = new Map(prevDecisions.map((d) => [d.decisionId, d]));

  const modifiedDecisions = newDecisions.filter((newDec) => {
    const prevDec = prevMap.get(newDec.decisionId);

    if (!prevDec) return false;

    return hasChanges(prevDec, newDec);
  });

  if (modifiedDecisions.length === 0) {
    return;
  }

  const decisionsByRule = modifiedDecisions.map((decision) => {
    const prevDecision = prevMap.get(decision.decisionId)!;

    const conditionGroups = decision.conditionGroups
      ? decision.conditionGroups.map((item) => {
          const prevGroup = prevDecision.conditionGroups?.find(
            (pg) =>
              (pg.conditionGroupId ?? pg.ConditionGroupId) ===
              (item.conditionGroupId ?? item.ConditionGroupId),
          );

          return {
            conditionGroupId: item.conditionGroupId ?? item.ConditionGroupId,
            transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
            conditionsThatEstablishesTheDecision:
              item.conditionsThatEstablishesTheDecision
                ?.map((condition) => {
                  if (condition.value === undefined) return null;

                  const prevCondition =
                    prevGroup?.conditionsThatEstablishesTheDecision?.find(
                      (pc) => pc.conditionName === condition.conditionName,
                    );

                  let conditionOperation = ETransactionOperation.PARTIAL_UPDATE;
                  if (!prevCondition) {
                    conditionOperation = ETransactionOperation.PARTIAL_UPDATE;
                  } else if (prevCondition.value !== condition.value) {
                    conditionOperation = ETransactionOperation.PARTIAL_UPDATE;
                  }

                  return {
                    conditionName: condition.conditionName,
                    value: condition.value,
                    transactionOperation: conditionOperation,
                  };
                })
                .filter(Boolean) as IConditionsTheDecision[],
          };
        })
      : undefined;

    const validUntil = decision.validUntil
      ? formatDateDecision(decision.validUntil as string)
      : undefined;

    return {
      effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
      validUntil,
      value: decision.value,
      transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
      decisionId: decision.decisionId,
      conditionGroups,
    };
  });

  const ruleName = prevRef[0]?.ruleName ?? newDecision[0]?.ruleName;

  return [
    {
      modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
      ruleName,
      decisionsByRule,
    },
  ];
};

const hasChanges = (prevDec: any, newDec: any): boolean => {
  if (prevDec.value !== newDec.value) return true;
  if (prevDec.effectiveFrom !== newDec.effectiveFrom) return true;
  if (prevDec.validUntil !== newDec.validUntil) return true;

  const prevGroups = prevDec.conditionGroups ?? [];
  const newGroups = newDec.conditionGroups ?? [];

  if (prevGroups.length !== newGroups.length) return true;

  for (const newGroup of newGroups) {
    const prevGroup = prevGroups.find(
      (pg: any) =>
        (pg.conditionGroupId ?? pg.ConditionGroupId) ===
        (newGroup.conditionGroupId ?? newGroup.ConditionGroupId),
    );

    if (!prevGroup) return true;

    const prevConditions = prevGroup.conditionsThatEstablishesTheDecision ?? [];
    const newConditions = newGroup.conditionsThatEstablishesTheDecision ?? [];

    if (prevConditions.length !== newConditions.length) return true;

    for (const newCond of newConditions) {
      const prevCond = prevConditions.find(
        (pc: any) => pc.conditionName === newCond.conditionName,
      );

      if (!prevCond || prevCond.value !== newCond.value) return true;
    }
  }

  return false;
};

export { getUpdateDecisionsConfig };
