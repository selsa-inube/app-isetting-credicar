import { ITabConfig } from "../../requestInProgTab/ITabConfig";

interface IEditPayrollTabsConfig {
  generalInformation: ITabConfig;
  regularPaymentCycles: ITabConfig;
  extraordinaryPaymentCycles: ITabConfig;
}

export type { IEditPayrollTabsConfig };
