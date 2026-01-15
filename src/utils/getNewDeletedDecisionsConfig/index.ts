/* eslint-disable @typescript-eslint/no-explicit-any */
import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { findDecision } from "../destination/findDecision";
import { arraysEqual } from "../destination/arraysEqual";

const getNewDeletedDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
) => {
  if (useCase && !arraysEqual(prevRef, newDecision)) {
    const deletedDecisions = prevRef
      .filter((decision) => !findDecision(newDecision, decision))
      .flatMap(
        (decision) =>
          decision.decisionsByRule?.map((dec) => {
            const conditionGroups = dec.conditionGroups
              ? dec.conditionGroups.map((item) => ({
                  conditionGroupId:
                    item.conditionGroupId ?? item.ConditionGroupId,
                  transactionOperation: ETransactionOperation.DELETE,
                  conditionsThatEstablishesTheDecision:
                    item.conditionsThatEstablishesTheDecision
                      ?.filter((condition) => condition.value !== undefined)
                      .map((condition) => ({
                        conditionName: condition.conditionName,
                        value: condition.value,
                        transactionOperation: ETransactionOperation.DELETE,
                      })) as IConditionsTheDecision[],
                }))
              : undefined;

            const validUntil = dec.validUntil
              ? formatDateDecision(dec.validUntil as string)
              : undefined;

            return {
              ruleName: decision.ruleName,
              decision: {
                effectiveFrom: formatDateDecision(dec.effectiveFrom as string),
                validUntil: validUntil,
                value: dec.value,
                transactionOperation: ETransactionOperation.DELETE,
                decisionId: dec.decisionId,
                conditionGroups: conditionGroups,
              },
            };
          }) || [],
      );

    const groupedByRule = deletedDecisions.reduce(
      (acc, item) => {
        if (!acc[item.ruleName as string]) {
          acc[item.ruleName as string] = [];
        }
        acc[item.ruleName as string].push(item.decision);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    return Object.entries(groupedByRule).map(([ruleName, decisions]) => ({
      modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
      ruleName: ruleName,
      decisionsByRule: decisions,
    }));
  }
};

export { getNewDeletedDecisionsConfig };
