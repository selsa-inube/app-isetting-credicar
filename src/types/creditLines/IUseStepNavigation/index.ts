import { IDropdownMenuGroup } from "@isettingkit/business-rules";

interface IUseStepNavigation {
  groups: readonly IDropdownMenuGroup[];
  isProcessing: boolean;
  handleStep: (click: boolean) => Promise<boolean>;
  handleSave: (click: boolean) => Promise<boolean>;
}

export type { IUseStepNavigation };
