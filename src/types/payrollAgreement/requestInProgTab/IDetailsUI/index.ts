import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IDetailsUI {
  data: IEntry;
  isMobile: boolean;
  showModal: boolean;
  showMoreDetailsModal: boolean;
  screenTablet: boolean;
  abbreviatedName: string;
  isSelected: string;
  defaultSelectedTab: string;
  filteredTabsConfig: IDetailsTabsConfig;
  detailsTabsConfig: IDetailsTabsConfig;
  labelsDetails: ILabel[];
  labelsPaymentCard: ILabel[];
  ordinaryPaymentData: IEntry[];
  extraordinaryPaymentData: IEntry[];
  ordinaryIncludedData: IEntry[];
  ordinaryEliminatedData: IEntry[];
  extraordinaryIncludedData: IEntry[];
  extraordinaryEliminatedData: IEntry[];
  normalizeDataMoreDetails: IEntry;
  labelsOfRequestDetails: ILabel[];
  title: string;
  onTabChange: (id: string) => void;
  onToggleModal: () => void;
  onToggleMoreDetailsModal: () => void;
}

export type { IDetailsUI };
