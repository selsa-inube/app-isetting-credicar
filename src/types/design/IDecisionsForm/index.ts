import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IDecisionsForm {
  deleteModal: IMessageModal;
  initialValues: IRuleDecisionExtended[];
  labelBusinessRules: string;
  textValuesBusinessRules: IRulesFormTextValues;
  decisionTemplateConfig: (
    enumeratorsRules: IDecisionData,
    language: string,
    nameRule: string,
    businessUnit?: string,
  ) => IRuleDecisionExtended;
  onButtonClick: () => void;
  onPreviousStep: () => void;
  setDecisions: (decisions: IRuleDecisionExtended[]) => void;
  revertModalDisplayData: (
    dataDecision: IRules,
    originalDecision: IRules,
  ) => void;
  nameRule: string;
  disabledButton?: boolean;
  bottomAddButton?: string;
  editDataOption?: boolean;
  showAttentionModal?: boolean;
  attentionModal?: IMessageModal;
  normalizeEvaluateRuleData?: IRules[];
  titleContentAddCard?: string;
  setShowAttentionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  messageEmptyDecisions?: string;
  heightContentPage?: string;
  ruleCatalog?: string;
}

export type { IDecisionsForm };
