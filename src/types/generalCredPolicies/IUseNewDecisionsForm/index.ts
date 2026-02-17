import { IRuleDecision } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseNewDecisionsForm {
  initialDecisions: IRuleDecision[];
  option: string;
  disabledButton: boolean;
  ruleCatalog: string;
  labelBusinessRules: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[] | any>>;
  decisionTemplateConfig: (
    enumeratorsRules: IRuleDecisionExtended,
    language: string,
    nameRule: string,
    businessUnit?: string,
  ) => void;
  nameRule?: string;
}

export type { IUseNewDecisionsForm };
