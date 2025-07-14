import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@design/modals/detailsCreditLinesModal/types";

interface IDetailsCreditLinesModalUI {
  data: IEntry;
  detailsTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
}

export type { IDetailsCreditLinesModalUI };
