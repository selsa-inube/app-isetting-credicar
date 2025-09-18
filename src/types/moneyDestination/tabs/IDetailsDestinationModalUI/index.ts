import { IEntry } from "@ptypes/design/table/IEntry";
import { ITab } from "@inubekit/inubekit";

interface IDetailsDestinationModalUI {
  data: IEntry;
  filteredTabs: ITab[];
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  showGeneraldata: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
}

export type { IDetailsDestinationModalUI };
