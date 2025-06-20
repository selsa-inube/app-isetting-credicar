import { IRuleDecision } from "@isettingkit/input";
import { IMessageModal } from "../IMessageModal";
import { IRulesFormTextValues } from "../IRulesFormTextValues";

interface IDecisionsFormUI {
  attentionModal: IMessageModal;
  decisions: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  deleteModal: IMessageModal;
  isModalOpen: boolean;
  loading: boolean;
  selectedDecision: IRuleDecision | null;
  showAttentionModal: boolean;
  showDeleteModal: boolean;
  textValuesBusinessRules: IRulesFormTextValues;
  hasChanges: boolean;
  cancelButtonLabel: string;
  saveButtonLabel: string;
  onButtonClick: () => void;
  onPreviousStep: () => void;
  onCloseModal: () => void;
  onDelete: () => void;
  onOpenModal: () => void;
  onSubmitForm: (dataDecision: IRuleDecision) => void;
  onToggleAttentionModal: () => void;
  onToggleDeleteModal: (id: string) => void;
  onSave: () => void;
  handleReset: () => void;
  editDataOption?: boolean;
  titleContentAddCard?: string;
  messageEmptyDecisions?: string;
}

export type { IDecisionsFormUI };
