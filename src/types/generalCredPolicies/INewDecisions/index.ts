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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[] | any>>;
  decisionTemplateConfig: (
    enumeratorsRules: IRuleDecisionExtended,
    language: string,
    nameRule: string,
    businessUnit?: string,
  ) => void;
  onSave: () => void;
  nameRule?: string;
}
export type { INewDecisions };
