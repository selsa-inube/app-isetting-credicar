import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IConfigurationLinesUI {
  loading: boolean;
  data: Record<string, string>;
  updateData: boolean;
  showModal: boolean;
  modalData: IModalData;
  showInfoModal: boolean;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  withDecisions?: boolean;
  withoutDecisions?: boolean;
}

export type { IConfigurationLinesUI };
