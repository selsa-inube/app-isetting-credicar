import { ITabConfig } from "../../../ITabConfig";

interface IDetailsTabsConfig {
  ordinaryPayment?: ITabConfig;
  extraordinaryPayment?: ITabConfig;
  ordinaryPaymentIncluded?: ITabConfig;
  ordinaryPaymentRemoved?: ITabConfig;
  extraordinaryPaymentIncluded?: ITabConfig;
  extraordinaryPaymentRemoved?: ITabConfig;
}

export type { IDetailsTabsConfig };
