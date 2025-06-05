import { IRuleDecision } from "@isettingkit/input";
import { IMessageModal } from "@ptypes/decisions/IMessageModal";

interface IUseDecisionForm {
  initialValues: IRuleDecision[];
  revertModalDisplayData: (
    dataDecision: IRuleDecision,
    originalDecision: IRuleDecision,
  ) => void;
  onButtonClick: () => void;
  setCreditLineDecisions: (decisions: IRuleDecision[]) => void;
  heightContentPage: string;
  showAttentionModal?: boolean;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  normalizeEvaluateRuleData?: IRuleDecision[];
  editDataOption?: boolean;
  disabledButton?: boolean;
  onPreviousStep?: () => void;
  attentionModal?: IMessageModal;
}

export type { IUseDecisionForm };
