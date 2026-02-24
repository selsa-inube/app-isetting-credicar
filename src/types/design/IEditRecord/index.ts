import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IEditRecord {
  showInfoModal: boolean;
  modalData: IModalData;
  onEdit: () => void;
}

export type { IEditRecord };
