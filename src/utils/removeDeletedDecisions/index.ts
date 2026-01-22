import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";

const removeDeletedDecisions = (
  existingRules: ILinesConstructionData,
  rulesToDelete: ILinesConstructionData,
): ILinesConstructionData => {
  const decisionsToDelete: {
    ruleName: string;
    effectiveFrom: string;
    value: unknown;
    decisionId?: string;
  }[] = [];

  rulesToDelete.rules?.forEach((rule) => {
    rule.decisionsByRule?.forEach((decision) => {
      if (decision.transactionOperation === "Delete") {
        decisionsToDelete.push({
          ruleName: rule.ruleName ?? "",
          effectiveFrom: decision.effectiveFrom ?? "",
          value: decision.value,
          decisionId: decision.decisionId,
        });
      }
    });
  });

  if (decisionsToDelete.length === 0) {
    return existingRules;
  }

  const updatedRules =
    existingRules.rules
      ?.map((ruleGroup) => {
        const hasDeletesForThisRule = decisionsToDelete.some(
          (deleteItem) => deleteItem.ruleName === ruleGroup.ruleName,
        );

        if (!hasDeletesForThisRule) {
          return ruleGroup;
        }

        const filteredDecisions = ruleGroup.decisionsByRule?.filter(
          (decision) => {
            const shouldDelete = decisionsToDelete.some((deleteItem) => {
              if (deleteItem.ruleName !== ruleGroup.ruleName) {
                return false;
              }

              const isSameEffectiveFrom =
                decision.effectiveFrom === deleteItem.effectiveFrom;

              const isSameValue =
                JSON.stringify(decision.value) ===
                JSON.stringify(deleteItem.value);

              const isSameDecisionId = deleteItem.decisionId
                ? decision.decisionId === deleteItem.decisionId ||
                  decision._originalDecisionId === deleteItem.decisionId
                : true;

              return isSameEffectiveFrom && isSameValue && isSameDecisionId;
            });

            return !shouldDelete;
          },
        );

        return {
          ...ruleGroup,
          decisionsByRule: filteredDecisions,
        };
      })
      .filter(
        (ruleGroup) =>
          ruleGroup.decisionsByRule && ruleGroup.decisionsByRule.length > 0,
      ) ?? [];

  return {
    ...existingRules,
    rules: updatedRules,
  };
};

export { removeDeletedDecisions };
