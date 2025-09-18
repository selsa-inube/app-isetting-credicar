import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/moneyDestination/tabs/IDetailsTabsConfig";

interface IDetailsMoneyDestination {
  data: IEntry;
  showModal: boolean;
  handleToggleModal: () => void;
  detailsTabsConfig: IDetailsTabsConfig;
  defaultSelectedTab: string;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isSelected: string;
  onTabChange: (id: string) => void;
}

export type { IDetailsMoneyDestination };
