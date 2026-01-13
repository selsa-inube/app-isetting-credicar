import { IRuleDecision } from "@isettingkit/input";

const compareValueDecision = (
  initialDecisions: IRuleDecision[],
  newDecision: IRuleDecision,
): IRuleDecision | undefined => {
  return initialDecisions?.find((d) => {
    if (typeof d.value === "string" && typeof newDecision.value === "string") {
      return d.value === newDecision.value;
    }

    if (typeof d.value === "object" && typeof newDecision.value === "object") {
      return JSON.stringify(d.value) === JSON.stringify(newDecision.value);
    }

    return false;
  });
};

export { compareValueDecision };
