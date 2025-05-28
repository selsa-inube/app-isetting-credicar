import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/payrollAgreement/requestInProgTab/IDetailsTabsConfig";

interface IUseMoreDetails {
  smallScreenTab: boolean;
  filteredTabsConfig: IDetailsTabsConfig;
  detailsTabsConfig: IDetailsTabsConfig;
  ordinaryPaymentData: IEntry[] | undefined;
  ordinaryEliminatedData: IEntry[] | undefined;
  extraordinaryPaymentData: IEntry[] | undefined;
  ordinaryIncludedData: IEntry[] | undefined;
  extraordinaryIncludedData: IEntry[] | undefined;
  extraordinaryEliminatedData: IEntry[] | undefined;
  isSelected: string;
}

export type { IUseMoreDetails };
