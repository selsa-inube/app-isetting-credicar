import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const getDecisionIdMethods = (
  methodsData: IRuleDecisionExtended[] | undefined,
  value: string,
) => {
  if (methodsData) {
    const idMethod = methodsData.find(
      (method) => method.value === value,
    )?.decisionId;
    return idMethod ?? undefined;
  }

  return undefined;
};

export { getDecisionIdMethods };
