import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
interface IDelete {
  modalData: IModalData;
  showDecision: boolean;
  loading: boolean;
  onToggleModal: () => void;
  withActionMobile?: boolean;
}

export type { IDelete };
