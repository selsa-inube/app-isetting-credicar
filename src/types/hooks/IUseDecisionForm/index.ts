import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { ILanguage } from "@ptypes/i18n";

interface IUseDecisionForm {
  initialValues: IRuleDecisionExtended[];
  revertModalDisplayData: (
    dataDecision: IRuleDecisionExtended,
    originalDecision: IRuleDecisionExtended,
  ) => void;
  onButtonClick: () => void;
  setCreditLineDecisions: (decisions: IRuleDecisionExtended[]) => void;
  heightContentPage: string;
  ruleData: IRuleDecisionExtended;
  language: ILanguage;
  showAttentionModal?: boolean;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  normalizeEvaluateRuleData?: IRuleDecisionExtended[];
  editDataOption?: boolean;
  disabledButton?: boolean;
  onPreviousStep?: () => void;
  attentionModal?: IMessageModal;
}

export type { IUseDecisionForm };
