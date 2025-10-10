import { formatDateDecision } from "@utils/date/formatDateDecision";
import { IGetConfiguredDecisions } from "@ptypes/decisions/IGetConfiguredDecisions";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { parseIfJSON } from "@utils/parseIfJSON";
import { toRenderableValue } from "@utils/toRenderableValue";

const mapGetConfiguredEntities = (
  data: IGetConfiguredDecisions,
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
          value: toRenderableValue(parsed),
          effectiveFrom: formatDateDecision(decision.effectiveFrom),
        };
      }),
      parameterizedConditions: data.parameterizedConditions,
      ruleName: data.decisions[0]?.ruleName || "",
    },
  ];
};

export { mapGetConfiguredEntities };
