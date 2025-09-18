import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IDetailsDestinationModal {
  data: IEntry;
  defaultSelectedTab: string;
  detailsTabsConfig: IDetailsTabsConfig;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isSelected: string;
  portalId: string;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
}

export type { IDetailsDestinationModal };
