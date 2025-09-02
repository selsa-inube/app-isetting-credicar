import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";

interface ICreditLinesUI {
  creditLinesTabs: ITab[];
  descriptionOptions: ICardData;
  isSelected: string;
  showCreditLinesTab: boolean;
  showLinesUnderConstructionTab: boolean;
  showRequestsInProgressTab: boolean;
  smallScreen: boolean;
  handleTabChange: (tabId: string) => void;
}

export type { ICreditLinesUI };
