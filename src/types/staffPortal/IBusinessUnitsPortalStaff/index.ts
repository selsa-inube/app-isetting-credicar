interface IBusinessUnitsPortalStaff {
  publicCode: string;
  abbreviatedName: string;
  descriptionUse: string;
  urlLogo: string;
  firstMonthOfFiscalYear?: string;
  languageId?: string;
  languageiso?: string;
  [key: string]: string | undefined;
}

export type { IBusinessUnitsPortalStaff };
