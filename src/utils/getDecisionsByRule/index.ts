import { IEntry } from "@ptypes/design/table/IEntry";

const getDecisionsByRule = (
  decisions: IEntry[],
  ruleName: string,
  conditionFilter?: (condition: IEntry) => boolean,
) =>
  decisions
    .filter((decision: IEntry) => decision.ruleName === ruleName)
    .map((decision: IEntry, idx: number) => {
      return {
        ...decision,
        decisionId: `Decisión ${idx + 1}`,
        conditionsThatEstablishesTheDecision: decision.conditionGroups?.flatMap(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (group: any) => {
            return conditionFilter
              ? group.conditionsThatEstablishesTheDecision?.filter(
                  conditionFilter,
                )
              : group.conditionsThatEstablishesTheDecision;
          },
        ),
      };
    });

export { getDecisionsByRule };
