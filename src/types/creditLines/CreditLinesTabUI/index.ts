import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IEntry } from "@ptypes/design/table/IEntry";

interface ICreditLinesTabUI {
  loadingRules: boolean;
  loadingCreditLines: boolean;
  searchCreditLines: string;
  showModal: boolean;
  modalData: IModalData;
  disabledButton: boolean;
  smallScreen: boolean;
  columnWidths: number[];
  entries: IEntry[];
  emptyDataMessage: string;
  businessRules: string[];
  showIcon: boolean;
  validateMissingRules: boolean;
  hasBusinessRules: boolean;
  pageLength: number;
  showAddModal: boolean;
  setShowUnderConstruction: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleAddModal: () => void;
  setEntryDeleted: React.Dispatch<React.SetStateAction<string | number>>;
  onToggleInfoModal: () => void;
  onSearchCreditLines: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { ICreditLinesTabUI };
