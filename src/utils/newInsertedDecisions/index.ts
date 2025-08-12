import { IRuleDecision } from "@isettingkit/input";
import { ETransactionOperation } from "@enum/transactionOperation";

const newInserted = (decisions: IRuleDecision[]) =>
  decisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === ETransactionOperation.INSERT,
  );

export { newInserted };
