/* eslint-disable @typescript-eslint/no-explicit-any */
import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";

import { arraysEqual } from "../decisions/arraysEqualServices";
import { findDecisionServices } from "../decisions/findDecisionServices";

const getNewDeletedDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
) => {
  console.log({ prevRef, newDecision });

  if (useCase && !arraysEqual(prevRef as any, newDecision as any)) {
    return prevRef
      .filter((decision) => findDecisionServices(newDecision, decision))
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((decision) => {
          const conditionGroups = decision.conditionGroups
            ? decision.conditionGroups.map((item) => ({
                conditionGroupId:
                  item.conditionGroupId ?? item.ConditionGroupId,
                transactionOperation: ETransactionOperation.DELETE,
                conditionsThatEstablishesTheDecision:
                  item.conditionsThatEstablishesTheDecision?.filter(
                    (condition) => {
                      if (condition.value !== undefined) {
                        return {
                          conditionName: condition.conditionName,
                          value: condition.value,
                          transactionOperation: ETransactionOperation.DELETE,
                        };
                      }
                    },
                  ) as IConditionsTheDecision[],
              }))
            : undefined;
          const validUntil = decision.validUntil
            ? formatDateDecision(decision.validUntil as string)
            : undefined;
          return {
            effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
            validUntil: validUntil,
            value: decision.value,
            transactionOperation: ETransactionOperation.DELETE,
            decisionId: decision.decisionId,
            conditionGroups: conditionGroups,
          };
        });

        console.log("🍿", { decisionsByRule });
        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: decisionsByRule,
        };
      });
  }
};

export { getNewDeletedDecisionsConfig };
