import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";

interface IUseModalEditConfig {
  showConfigSubmitModal: boolean;
  showEditSubmitModal: boolean;
  unconfiguredRules: IPostCheckLineRule[];
  editedRules: IPostCheckLineRule[];
  option: boolean;
  numberRequest: string;
  onSaveModal: () => void;
  onEditSubmitModal: () => void;
  onToggleUnconfiguredRules: () => void;
  onUnconfiguredModal: () => void;
}

export type { IUseModalEditConfig };
