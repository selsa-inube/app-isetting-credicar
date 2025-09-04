import { ITabConfig } from "../../ITabConfig";

interface ICreditTabsConfig {
  creditLines: ITabConfig;
  requestsInProgress: ITabConfig;
  linesUnderConstruction: ITabConfig;
}

export type { ICreditTabsConfig };
