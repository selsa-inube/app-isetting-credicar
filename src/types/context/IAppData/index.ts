import { IBusinessManager } from "@ptypes/context/IBusinessManager";
import { IBusinessUnit } from "@ptypes/context/IBusinessUnit";
import { IPortal } from "@ptypes/context/IPortal";
import { IUser } from "@ptypes/context/IUser";

interface IAppData {
  portal: IPortal;
  businessManager: IBusinessManager;
  businessUnit: IBusinessUnit;
  user: IUser;
  language: string;
  token: string;
}

export type { IAppData };
