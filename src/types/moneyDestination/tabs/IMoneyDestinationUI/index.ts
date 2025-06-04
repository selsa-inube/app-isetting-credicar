import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { IMenuOptions } from "@ptypes/design/IMenuOptions";

interface IMoneyDestinationUI {
  isSelected: string;
  descriptionOptions: ICardData;
  options: IMenuOptions[];
  showModal: boolean;
  showInfoModal: boolean;
  smallScreen: boolean;
  showMoneyTab: boolean;
  showRequestsTab: boolean;
  moneyDestinationTabs: ITab[];
  onToggleInfoModal: () => void;
  onCloseMenu: () => void;
  onToggleModal: () => void;
  handleTabChange: (id: string) => void;
}

export type { IMoneyDestinationUI };
