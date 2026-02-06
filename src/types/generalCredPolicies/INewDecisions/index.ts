import { IRuleDecision } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface INewDecisions {
  customMessageEmptyDecisions: string;
  initialDecisions: IRuleDecision[];
  ruleCatalog: string;
  editionMode: "classic" | "versioned";
  option: string;
  loading: boolean;
  labelBusinessRules: string;
  onPreviousStep: () => void;
  disabledButton: boolean;
  onToggleDateModal: () => void;
  decisionTemplateConfig: (
    enumeratorsRules: IRuleDecisionExtended,
    language: string,
    nameRule: string,
    businessUnit?: string,
  ) => void;
  nameRule?: string;
}
export type { INewDecisions };
