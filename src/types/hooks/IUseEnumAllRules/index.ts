import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

interface IUseEnumAllRules {
  ruleCatalog: string;
  catalogAction: string;
  optionsContext: INavigationRule[];
}

export type { IUseEnumAllRules };
