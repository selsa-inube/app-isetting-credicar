import { IRuleDecision } from "@isettingkit/input";
import { TransactionOperation } from "@enum/transactionOperation";

const newInserted = (decisions: IRuleDecision[]) =>
  decisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === TransactionOperation.INSERT,
  );

export { newInserted };
