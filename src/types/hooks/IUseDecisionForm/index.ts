import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IRuleDecision } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseDecisionForm {
  initialValues: IRuleDecision[];
  revertModalDisplayData: (
    dataDecision: IRules,
    originalDecision: IRules,
  ) => void;
  onButtonClick: () => void;
  setCreditLineDecisions: (decisions: IRuleDecisionExtended[]) => void;
  heightContentPage: string;
  showAttentionModal?: boolean;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  normalizeEvaluateRuleData?: IRules[];
  editDataOption?: boolean;
  disabledButton?: boolean;
  onPreviousStep?: () => void;
  attentionModal?: IMessageModal;
}

export type { IUseDecisionForm };
