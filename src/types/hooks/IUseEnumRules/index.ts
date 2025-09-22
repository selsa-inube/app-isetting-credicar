import { ILanguage } from "@ptypes/i18n";

interface IUseEnumRules {
  enumDestination: string;
  ruleCatalog: string;
  businessUnits: string;
  catalogAction: string;
  i18n?: ILanguage;
}

export type { IUseEnumRules };
