import { IEntry } from "@ptypes/design/table/IEntry";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
interface IMoneyDestinationTabUI {
  entries: IEntry[];
  loading: boolean;
  searchMoneyDestination: string;
  smallScreen: boolean;
  columnWidths: number[];
  emptyDataMessage: string;
  showInfoModal: boolean;
  disabledButton: boolean;
  modalData: IModalData;
  onToggleInfoModal: () => void;
  onSearchMoneyDestination: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEntryDeleted: (value: string | number) => void;
}

export type { IMoneyDestinationTabUI };
