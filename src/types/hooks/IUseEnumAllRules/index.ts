import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

interface IUseEnumAllRules {
  ruleCatalog: string;
  catalogAction: string;
  optionsContext: INavigationRule[];
  validRules: string[];
}

export type { IUseEnumAllRules };
