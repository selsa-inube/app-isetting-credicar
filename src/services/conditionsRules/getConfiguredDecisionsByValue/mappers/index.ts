import { formatDateDecision } from "@utils/date/formatDateDecision";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { parseIfJSON } from "@utils/parseIfJSON";
import { IConfiguredDecisionsByValue } from "@ptypes/creditLines/IConfiguredDecisionsByValue";

const mapGetConfiguredEntities = (
  data: IConfiguredDecisionsByValue,
): IConfiguredDecisions[] => {
  if (!data) return [];

  return [
    {
      decisionsByRule: data.decisions.map((decision) => {
        const parsed =
          typeof decision.value === "string"
            ? parseIfJSON(decision.value)
            : decision.value;
        return {
          ...decision,
          value: parsed,
          effectiveFrom: formatDateDecision(decision.effectiveFrom),
        };
      }),
      valuesInCondition: data.valuesInCondition,
      ruleName: data.decisions[0]?.ruleName || "",
    },
  ];
};

export { mapGetConfiguredEntities };
