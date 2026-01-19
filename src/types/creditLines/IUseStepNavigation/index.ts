import { IDropdownMenuGroup } from "@isettingkit/business-rules";

interface IUseStepNavigation {
  groups: readonly IDropdownMenuGroup[];
  disabledButtons: boolean;
  disabledButtonSend: boolean;
  loadingSendData: boolean;
  handleStep: (click: boolean) => Promise<boolean>;
  handleSave: (click: boolean) => Promise<boolean>;
}

export type { IUseStepNavigation };
