import { ITab } from "@inubekit/inubekit";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { ILabel } from "@ptypes/ILabel";

interface IDetailsRequestUI {
  data: IEntry;
  filteredTabs: ITab[];
  isMobile: boolean;
  isSelectedRequest: string;
  loading: boolean;
  modalData: IModalData;
  screenTablet: boolean;
  showDecision: boolean;
  showErrorData: boolean;
  showModal: boolean;
  showTrazabilityData: boolean;
  title: string;
  withErrorRequest: boolean;
  labelsOfRequest: ILabel[];
  onApproval: () => void;
  onTabRequestChange: (id: string) => void;

  onToggleModal: () => void;
}

export type { IDetailsRequestUI };
