import { IRuleDecision } from "@isettingkit/input";
import { ETransactionOperation } from "@enum/transactionOperation";

const newUpdated = (decisions: IRuleDecision[]) =>
  decisions.filter(
    (decision: IRuleDecision) =>
      decision.transactionOperation === ETransactionOperation.PARTIAL_UPDATE,
  );

export { newUpdated };
