import { IUser } from "@ptypes/app.types";

interface IApp {
  code?: string;
  businessUnit?: string;
  user?: IUser;
}

export type { IApp };
