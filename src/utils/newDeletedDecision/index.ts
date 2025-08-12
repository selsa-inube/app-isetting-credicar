import { IRuleDecision } from "@isettingkit/input";
import { ETransactionOperation } from "@enum/transactionOperation";

const newDeleted = (decisions: IRuleDecision[]) =>
  decisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === ETransactionOperation.DELETE,
  );

export { newDeleted };
