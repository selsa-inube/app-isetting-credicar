import { IEntry } from "@ptypes/design/table/IEntry";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IpayrollAgreementTabUI {
  entries: IEntry[];
  loading: boolean;
  searchPayrollAgreement: string;
  smallScreen: boolean;
  columnWidths: number[];
  pageLength: number;
  emptyDataMessage: string;
  showInfoModal: boolean;
  disabledButton: boolean;
  modalData: IModalData;
  onToggleInfoModal: () => void;
  setEntryDeleted: (id: string | number) => void;
  onSearchPayrollAgreement: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IpayrollAgreementTabUI };
