import { IBusinessManager } from "@ptypes/context/authAndPortalDataProvider/IBusinessManager";
import { IBusinessUnit } from "@ptypes/context/authAndPortalDataProvider/IBusinessUnit";
import { IPortal } from "@ptypes/context/authAndPortalDataProvider/IPortal";
import { IUser } from "@ptypes/context/authAndPortalDataProvider/IUser";

interface IAppData {
  portal: IPortal;
  businessManager: IBusinessManager;
  businessUnit: IBusinessUnit;
  user: IUser;
  useCasesByStaff: string[];
  language: string;
  token: string;
}

export type { IAppData };
