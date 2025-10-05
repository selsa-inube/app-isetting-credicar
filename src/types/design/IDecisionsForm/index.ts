import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IDecisionsForm {
  deleteModal: IMessageModal;
  initialValues: IRuleDecisionExtended[];
  labelBusinessRules: string;
  textValuesBusinessRules: IRulesFormTextValues;
  decisionTemplateConfig: (
    enumeratorsRules: IRuleDecisionExtended,
    language: string,
    nameRule: string,
    businessUnit?: string,
  ) => void;
  onButtonClick: () => void;
  onPreviousStep: () => void;
  setDecisions: (decisions: IRuleDecisionExtended[]) => void;
  revertModalDisplayData: (
    dataDecision: IRuleDecisionExtended,
    originalDecision: IRuleDecisionExtended,
  ) => void;
  nameRule: string;
  disabledButton?: boolean;
  bottomAddButton?: string;
  editDataOption?: boolean;
  showAttentionModal?: boolean;
  attentionModal?: IMessageModal;
  normalizeEvaluateRuleData?: IRuleDecisionExtended[];
  titleContentAddCard?: string;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  messageEmptyDecisions?: string;
  heightContentPage?: string;
  ruleCatalog?: string;
}

export type { IDecisionsForm };
