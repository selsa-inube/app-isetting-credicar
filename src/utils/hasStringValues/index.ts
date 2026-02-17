import { IRuleDecision } from "@isettingkit/input";

const hasStringValues = (rule?: IRuleDecision[]): boolean => {
  if (rule && rule.length > 0) {
    return rule.some(
      (entry) => entry.value !== undefined && entry.value !== null,
    );
  }
  return false;
};

export { hasStringValues };
