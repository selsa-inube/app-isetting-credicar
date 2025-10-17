import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";

interface IUseModalEditConfig {
  showConfigSubmitModal: boolean;
  showEditSubmitModal: boolean;
  unconfiguredRules: IPostCheckLineRule[];
  editedRules: IPostCheckLineRule[];
  onSaveModal: () => void;
  onEditSubmitModal: () => void;
  onToggleUnconfiguredRules: () => void;
  onUnconfiguredModal: () => void;
}

export type { IUseModalEditConfig };
