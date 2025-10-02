import { IRuleDecision } from "@isettingkit/input";

const isIRuleDecision = (v: unknown): v is IRuleDecision =>
  typeof v === "object" && v !== null;

export { isIRuleDecision };