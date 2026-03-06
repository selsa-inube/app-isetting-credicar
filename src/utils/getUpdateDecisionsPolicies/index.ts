import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { normalizedCodeList } from "../normalizedCodeList";

const getUpdateDecisionsPolicies = (
  useCase: boolean,
  prevRef: React.MutableRefObject<IRuleDecisionExtended[]>,
  current: IRuleDecisionExtended[],
  dateFrom?: string,
) => {
  if (!useCase) return;

  const prevDecisions = prevRef.current;

  const latestDecisionsMap = new Map<string, IRuleDecisionExtended>();

  current.forEach((dec) => {
    const existing = latestDecisionsMap.get(dec.decisionId ?? "");
    if (!existing) {
      latestDecisionsMap.set(dec.decisionId ?? "", dec);
    } else {
      const existingDate = new Date(existing.effectiveFrom ?? 0);
      const currentDate = new Date(dec.effectiveFrom ?? 0);
      if (currentDate > existingDate) {
        latestDecisionsMap.set(dec.decisionId ?? "", dec);
      }
    }
  });

  const deduplicatedCurrent = Array.from(latestDecisionsMap.values());

  const hasChanges = deduplicatedCurrent.some((currentDec) => {
    const prevDec = prevDecisions.find(
      (p) => p.decisionId === currentDec.decisionId,
    );

    if (!prevDec) return true;

    return prevDec.effectiveFrom !== currentDec.effectiveFrom;
  });

  if (!hasChanges) return;

  return deduplicatedCurrent
    .filter((currentDec) => {
      const prevDec = prevDecisions.find(
        (p) => p.decisionId === currentDec.decisionId,
      );

      if (!prevDec) return true;

      return prevDec.effectiveFrom !== currentDec.effectiveFrom;
    })
    .map((decision) => {
      const prevDecision = prevDecisions.find(
        (p) => p.decisionId === decision.decisionId,
      );

      let conditionGroups = undefined;

      if (decision.conditionGroups && decision.conditionGroups.length > 0) {
        const mappedGroups = decision.conditionGroups
          .map((conditionGroup: IConditionGroups, index: number) => {
            const conditionGroupId =
              prevDecision?.conditionGroups?.[index]?.conditionGroupId ??
              undefined;

            const validateTransOperation =
              (conditionGroupId?.length ?? 0) > 0
                ? ETransactionOperation.PARTIAL_UPDATE
                : ETransactionOperation.INSERT;

            const conditionsThatEstablishesTheDecision =
              (conditionGroup.conditionsThatEstablishesTheDecision
                ?.filter((condition) => condition.value !== undefined)
                .map((condition) => ({
                  conditionName: condition.conditionName,
                  value:
                    condition?.listOfPossibleValues?.list &&
                    condition.listOfPossibleValues?.list?.length > 0
                      ? normalizedCodeList(
                          condition.value,
                          condition.listOfPossibleValuesHidden?.list,
                        )
                      : condition.value,
                  transactionOperation: validateTransOperation,
                })) as IConditionsTheDecision[]) || [];

            return {
              transactionOperation:
                conditionsThatEstablishesTheDecision.length > 0
                  ? validateTransOperation
                  : undefined,
              conditionGroupId,
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

      const validUntil = decision.validUntil;

      return {
        modifyJustification: `${decisionsLabels.modifyJustification} ${decision.ruleName}`,
        ruleName: decision.ruleName,
        decisionsByRule: [
          {
            decisionId: decision.decisionId,
            effectiveFrom: decision.effectiveFrom
              ? decision.effectiveFrom
              : dateFrom,
            ...(validUntil && { validUntil }),
            value: decision.value,
            transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
            ...(conditionGroups && { conditionGroups }),
          },
        ],
      };
    });
};

export { getUpdateDecisionsPolicies };
