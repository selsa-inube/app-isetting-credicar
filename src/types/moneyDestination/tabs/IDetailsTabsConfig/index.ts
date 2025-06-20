import { ITabConfig } from "@ptypes/ITabConfig";

interface IDetailsTabsConfig {
  generalData: ITabConfig;
  creditLine: ITabConfig;
  creditLineIncluded?: ITabConfig;
  creditLineRemoved?: ITabConfig;
}

export type { IDetailsTabsConfig };
