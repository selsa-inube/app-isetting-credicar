import { ETransactionOperation } from "@enum/transactionOperation";
import { ECreditLines } from "@enum/creditLines";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { findDecision } from "../destination/findDecision";
import { arraysEqual } from "../destination/arraysEqual";

const getNewInsertDecisionsConfig = (
  useCase: boolean,
  user: string,
  prevRef: IRuleDecisionExtended[],
  decision: IRuleDecisionExtended[],
  abbreviatedName: string,
) => {
  if (useCase && !arraysEqual(prevRef, decision)) {
    return decision
      .filter((decision) => !findDecision(prevRef, decision))
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const conditionGroups = condition.conditionGroups
            ? condition.conditionGroups.map((item) => ({
                conditionGroupId: item.conditionGroupId,
                transactionOperation: ETransactionOperation.INSERT,
                conditionsThatEstablishesTheDecision: [
                  ...(item.conditionsThatEstablishesTheDecision
                    ?.filter((condition) => condition.value !== undefined)
                    .map((condition) => ({
                      conditionDataType: condition.conditionDataType,
                      conditionName: condition.conditionName,
                      howToSetTheCondition: condition.howToSetTheCondition,
                      value: condition.value,
                      transactionOperation: ETransactionOperation.INSERT,
                    })) || []),
                  {
                    conditionName: ECreditLines.CREDIT_LINE_RULE,
                    value: abbreviatedName,
                    transactionOperation: ETransactionOperation.INSERT,
                  },
                ] as IConditionsTheDecision[],
              }))
            : undefined;

          const validUntil = condition.validUntil
            ? formatDateDecision(condition.validUntil as string)
            : undefined;

          return {
            effectiveFrom: formatDateDecision(
              condition.effectiveFrom as string,
            ),
            validUntil: validUntil,
            value: condition.value,
            transactionOperation: ETransactionOperation.INSERT,
            decisionId: condition.decisionId,
            conditionGroups: conditionGroups,
          };
        });
        return {
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          ruleName: decision.ruleName,
          decisionsByRule: decisionsByRule,
        };
      });
  }
};

export { getNewInsertDecisionsConfig };
