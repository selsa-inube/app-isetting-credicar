import { IEntry } from "@ptypes/design/table/IEntry";

const getDecisionsByRule = (
  decisions: IEntry[],
  ruleName: string,
  conditionFilter?: (condition: IEntry) => boolean,
) =>{
  console.log('getDecisionsByRule: ',decisions);
 return decisions
    .filter((decision: IEntry) => decision.ruleName === ruleName)
    .map((decision: IEntry, idx: number) => ({
      ...decision,
      decisionId: `Decisión ${idx + 1}`,
      ...(conditionFilter && decision.conditionsThatEstablishesTheDecision
        ? {
            conditionsThatEstablishesTheDecision:
              decision.conditionsThatEstablishesTheDecision.filter(
                conditionFilter,
              ),
          }
        : {}),
    }));
}
  

export { getDecisionsByRule };
