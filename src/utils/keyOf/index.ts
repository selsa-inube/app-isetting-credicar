import { IRuleDecision } from "@isettingkit/input";

const keyOf = (x: IRuleDecision) =>
  String(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (x as any).decisionId ?? (x as any).businessRuleId ?? (x as any).id ?? "",
  );

export { keyOf };
