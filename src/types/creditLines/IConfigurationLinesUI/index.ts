import { TLinkItem } from "@isettingkit/business-rules";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IConfigurationLinesUI {
  loading: boolean;
  data: Record<string, string>;
  updateData: boolean;
  showModal: boolean;
  modalData: IModalData;
  showInfoModal: boolean;
  openId: string | null;
  getActiveId: (links: TLinkItem[]) => string | undefined;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  withDecisions?: boolean;
  withoutDecisions?: boolean;
}

export type { IConfigurationLinesUI };
