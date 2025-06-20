import { ITabConfig } from "../../../ITabConfig";

interface IEditPayrollTabsConfig {
  generalInformation: ITabConfig;
  regularPaymentCycles: ITabConfig;
  extraordinaryPaymentCycles: ITabConfig;
}

export type { IEditPayrollTabsConfig };
