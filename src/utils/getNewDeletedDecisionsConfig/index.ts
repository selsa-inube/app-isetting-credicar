import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";

const getNewDeletedDecisionsConfig = (
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

  const newIds = new Set(newDecisions.map((d) => d.decisionId));

  const deletedDecisions = prevDecisions.filter(
    (d) => !newIds.has(d.decisionId),
  );

  console.log("😨 deletedDecisions:", deletedDecisions);

  if (deletedDecisions.length === 0) {
    return;
  }

  const decisionsByRule = deletedDecisions.map((decision) => {
    const conditionGroups = decision.conditionGroups
      ? decision.conditionGroups.map((item) => ({
          conditionGroupId: item.conditionGroupId ?? item.ConditionGroupId,
          transactionOperation: ETransactionOperation.DELETE,
          conditionsThatEstablishesTheDecision:
            item.conditionsThatEstablishesTheDecision?.filter((condition) => {
              if (condition.value !== undefined) {
                return {
                  conditionName: condition.conditionName,
                  value: condition.value,
                  transactionOperation: ETransactionOperation.DELETE,
                };
              }
              return false;
            }) as IConditionsTheDecision[],
        }))
      : undefined;

    const validUntil = decision.validUntil
      ? formatDateDecision(decision.validUntil as string)
      : undefined;

    return {
      effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
      validUntil,
      value: decision.value,
      transactionOperation: ETransactionOperation.DELETE,
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

export { getNewDeletedDecisionsConfig };
