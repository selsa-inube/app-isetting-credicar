import { IRuleDecision } from "@isettingkit/input";
import { EUseCase } from "@enum/useCase";
import { isUUID } from "../isUUID";

const getEditionModeForDecision = (
  option: string,
  decision: IRuleDecision | null,
): "classic" | "versioned" => {
  if (option !== EUseCase.EDIT) return "classic";
  if (!decision?.decisionId) return "classic";
  return isUUID(decision.decisionId) ? "versioned" : "classic";
};

export { getEditionModeForDecision };
