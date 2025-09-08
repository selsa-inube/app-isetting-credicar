import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IEntry } from "@ptypes/design/table/IEntry";

interface ILinesUnderConstructionTabUI {
  loading: boolean;
  searchLineInConstruction: string;
  showModal: boolean;
  modalData: IModalData;
  columnWidths: number[];
  entries: IEntry[];
  emptyDataMessage: string;
  pageLength: number;
  setEntryDeleted: React.Dispatch<React.SetStateAction<string | number>>;
  onSearchLineInConstruction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { ILinesUnderConstructionTabUI };
