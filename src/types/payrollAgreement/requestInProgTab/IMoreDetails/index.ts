import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IMoreDetails {
  data: IEntry;
  abbreviatedName: string;
  filteredTabsConfig: IDetailsTabsConfig;
  detailsTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  defaultSelectedTab: string;
  portalId: string;
  smallScreenTab: boolean;
  labelsDetails: ILabel[];
  labelsPaymentCard: ILabel[];
  title: string;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  ordinaryPaymentData?: IEntry[];
  extraordinaryPaymentData?: IEntry[];
  ordinaryIncludedData?: IEntry[];
  ordinaryEliminatedData?: IEntry[];
  extraordinaryIncludedData?: IEntry[];
  extraordinaryEliminatedData?: IEntry[];
}

export type { IMoreDetails };
