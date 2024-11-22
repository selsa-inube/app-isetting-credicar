interface IPortal {
  abbreviatedName: string;
  staffPortalCatalogId: string;
  businessManagerId: string;
  publicCode: string;
}
interface IBusinessManager {
  publicCode: string;
  abbreviatedName: string;
  urlBrand: string;
  urlLogo: string;
}

interface IUser {
  userAccount: string;
  userName: string;
}

interface IBusinessUnit {
  publicCode: string;
  abbreviatedName: string;
  languageId: string;
  urlLogo: string;
}

interface IAppData {
  portal: IPortal;
  businessManager: IBusinessManager;
  businessUnit: IBusinessUnit;
  user: IUser;
}
interface IAppContext {
  appData: IAppData;
  setAppData: React.Dispatch<React.SetStateAction<IAppData>>;
}

export type { IAppContext, IAppData, IBusinessUnit };
