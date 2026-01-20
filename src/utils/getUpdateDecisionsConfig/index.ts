import { ETransactionOperation } from "@enum/transactionOperation";
import { ECreditLines } from "@enum/creditLines";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";
import { areDecisionsEqualModify } from "../areDecisionsEqualModify";

const getUpdateDecisionsConfig = (
  useCase: boolean,
  prevRef: IRuleDecisionExtended[],
  newDecision: IRuleDecisionExtended[],
  abbreviatedName: string,
) => {
  if (!useCase) return;

  const prevDecisions = prevRef.flatMap((group) => group.decisionsByRule ?? []);
  const newDecisions = newDecision.flatMap(
    (group) => group.decisionsByRule ?? [],
  );

  const addedDecisions = newDecisions.filter((newDec) => {
    return !prevDecisions.some((prevDec) =>
      areDecisionsEqualModify(prevDec, newDec),
    );
  });

  if (addedDecisions.length === 0) {
    return;
  }

  const decisionsByRule = addedDecisions.map((decision) => {
    const conditionGroups =
      decision.conditionGroups && decision.conditionGroups.length > 0
        ? (() => {
            const filtered = decision.conditionGroups
              .filter(
                (item) => item.conditionsThatEstablishesTheDecision.length > 0,
              )
              .map((item) => {
                const filteredConditions =
                  (item.conditionsThatEstablishesTheDecision
                    ?.filter((condition) => {
                      if (
                        condition.conditionName ===
                        ECreditLines.CREDIT_LINE_RULE
                      ) {
                        return false;
                      }
                      return Object.values(condition.value).length > 0;
                    })
                    .map((condition) => ({
                      conditionName: condition.conditionName,
                      value: condition.value,
                      transactionOperation:
                        ETransactionOperation.PARTIAL_UPDATE,
                    })) as IConditionsTheDecision[]) || [];

                const updatedConditions: IConditionsTheDecision[] = [
                  ...filteredConditions,
                  {
                    conditionName: ECreditLines.CREDIT_LINE_RULE,
                    value: abbreviatedName,
                    transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
                  },
                ];

                return {
                  transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
                  conditionGroupId: item.conditionGroupId,
                  conditionsThatEstablishesTheDecision: updatedConditions,
                };
              });

            return filtered.length > 0
              ? filtered
              : [
                  {
                    transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
                    conditionsThatEstablishesTheDecision: [
                      {
                        conditionName: ECreditLines.CREDIT_LINE_RULE,
                        value: abbreviatedName,
                        transactionOperation:
                          ETransactionOperation.PARTIAL_UPDATE,
                      },
                    ],
                  },
                ];
          })()
        : [
            {
              transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
              conditionsThatEstablishesTheDecision: [
                {
                  conditionName: ECreditLines.CREDIT_LINE_RULE,
                  value: abbreviatedName,
                  transactionOperation: ETransactionOperation.PARTIAL_UPDATE,
                },
              ],
            },
          ];
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
      modifyJustification: `${decisionsLabels.modifyJustification} ${ruleName}`,
      ruleName,
      decisionsByRule,
    },
  ];
};

export { getUpdateDecisionsConfig };
