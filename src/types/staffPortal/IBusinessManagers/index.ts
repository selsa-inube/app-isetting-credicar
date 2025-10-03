interface IBusinessManagers {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
  clientId: string;
  clientSecret: string;
  [key: string]: string;
}

export type { IBusinessManagers };
