import { IEntry } from "@ptypes/design/table/IEntry";
interface IDetails {
  data: IEntry;
  isMobile: boolean;
  isMoreDetails?: boolean;
  moreDetailsData: IEntry;
  showModal: boolean;
  showMoreDetailsModal: boolean;
  onToggleModal: () => void;
  onToggleMoreDetailsModal: () => void;
}

export type { IDetails };
