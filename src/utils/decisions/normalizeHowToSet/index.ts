import { EValueHowToSetUp } from "@isettingkit/business-rules";

const normalizeHowToSet = (raw: unknown): EValueHowToSetUp => {
  if (typeof raw === "string") {
    const k = raw.toLowerCase();
    if (k.includes("equal")) return EValueHowToSetUp.EQUAL;
    if (k.includes("greater")) return EValueHowToSetUp.GREATER_THAN;
    if (k.includes("less")) return EValueHowToSetUp.LESS_THAN;
    if (k.includes("range") || k.includes("between"))
      return EValueHowToSetUp.RANGE;
    if (k.includes("multi")) return EValueHowToSetUp.LIST_OF_VALUES_MULTI;
    if (k.includes("list_of_values") || k.includes("among") || k.includes("in"))
      return EValueHowToSetUp.LIST_OF_VALUES;
  }
  return (raw as EValueHowToSetUp) ?? EValueHowToSetUp.EQUAL;
};

export { normalizeHowToSet };