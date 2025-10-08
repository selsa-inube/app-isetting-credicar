import { formatDateDecision } from "@utils/date/formatDateDecision";
import { IGetConfiguredDecisions } from "@ptypes/decisions/IGetConfiguredDecisions";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";

const mapGetConfiguredEntities = (
  data: IGetConfiguredDecisions,
): IConfiguredDecisions[] => {
  if (!data) return [];

  return [
    {
      decisionsByRule: data.decisions.map((decision) => ({
        ...decision,
        effectiveFrom: formatDateDecision(decision.effectiveFrom),
      })),
      parameterizedConditions: data.parameterizedConditions,
      ruleName: data.decisions[0]?.ruleName || "",
    },
  ];
};

export { mapGetConfiguredEntities };
