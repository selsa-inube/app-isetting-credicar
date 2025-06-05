import { IRuleDecision } from "@isettingkit/input";
import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";

interface IDecisionsFormUI {
  decisions: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  deleteModal: IMessageModal;
  isModalOpen: boolean;
  loading: boolean;
  selectedDecision: IRuleDecision | null;
  showDeleteModal: boolean;
  textValuesBusinessRules: IRulesFormTextValues;
  isMobile: boolean;
  saveButtonLabel: string;
  cancelButtonLabel: string;
  disabledNext: boolean;
  disabledPrevius: boolean;
  showDecisionModal: boolean;
  showFloatingAddButton: boolean;
  onButtonClick: () => void;
  onCloseModal: () => void;
  onDelete: () => void;
  onOpenModal: () => void;
  onSubmitForm: (dataDecision: IRuleDecision) => void;
  onToggleAttentionModal: () => void;
  onToggleDeleteModal: (id: string) => void;
  onSave: () => void;
  editDataOption?: boolean;
  shouldShowAttentionModal?: boolean;
  cancelButton?: () => void;
  attentionModal?: IMessageModal;
  titleContentAddCard?: string;
  messageEmptyDecisions?: string;
}

export type { IDecisionsFormUI };
