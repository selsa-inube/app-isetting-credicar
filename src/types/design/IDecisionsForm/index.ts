import { IRuleDecision } from "@isettingkit/input";
import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";

interface IDecisionsForm {
  deleteModal: IMessageModal;
  initialValues: IRuleDecision[];
  labelBusinessRules: string;
  textValuesBusinessRules: IRulesFormTextValues;
  decisionTemplateConfig: (
    enumeratorsRules: IRuleDecision,
    nameRule: string,
    businessUnit?: string,
  ) => IRuleDecision | undefined;
  onButtonClick: () => void;
  onPreviousStep: () => void;
  setDecisions: (decisions: IRuleDecision[]) => void;
  revertModalDisplayData: (
    dataDecision: IRuleDecision,
    originalDecision: IRuleDecision,
  ) => void;
  nameRule: string;
  disabledButton?: boolean;
  bottomAddButton?: string;
  editDataOption?: boolean;
  showAttentionModal?: boolean;
  attentionModal?: IMessageModal;
  normalizeEvaluateRuleData?: IRuleDecision[];
  titleContentAddCard?: string;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  messageEmptyDecisions?: string;
  heightContentPage?: string;
}

export type { IDecisionsForm };
