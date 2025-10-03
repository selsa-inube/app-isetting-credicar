import { IRuleDecision } from "@isettingkit/input";
import { decisionTemplates } from "@config/creditLines/decisionTemplates/registry";

interface IDecisionTemplateScreen {
  templateKey: keyof typeof decisionTemplates;
  initialDecisions?: IRuleDecision[];
  language?: "es" | "en";
}

export type { IDecisionTemplateScreen };
