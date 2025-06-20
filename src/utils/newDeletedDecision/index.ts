import { IRuleDecision } from "@isettingkit/input";
import { TransactionOperation } from "@enum/transactionOperation";

const newDeleted = (decisions: IRuleDecision[]) =>
  decisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === TransactionOperation.DELETE,
  );

export { newDeleted };
