import { decisionTemplates } from "@config/creditLines/decisionTemplates/registry";

interface IDecisionTemplateScreen {
  templateKey: keyof typeof decisionTemplates;
  language?: "es" | "en";
}

export type { IDecisionTemplateScreen };
