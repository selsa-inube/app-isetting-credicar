import { ITab } from "@inubekit/inubekit";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IDetails {
  data: IEntry;
  isMobile: boolean;
  isMoreDetails?: boolean;
  moreDetailsData: IEntry;
  showModal: boolean;
  showMoreDetailsModal: boolean;
  titleRequest: string;
  isSelectedRequest: string;
  filteredTabs: ITab[];
  showTrazabilityData: boolean;
  showErrorData: boolean;
  withErrorRequest: boolean;
  loading: boolean;
  modalData: IModalData;
  showDecision: boolean;
  labelButton: string;
  iconButton: React.ReactElement;
  onTabRequestChange: (id: string) => void;
  onClick: () => void;
  onToggleModal: () => void;
  onToggleMoreDetailsModal: () => void;
}

export type { IDetails };
