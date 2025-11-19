import { IIconAppearance } from "@inubekit/inubekit";
import { ReactNode } from "react";

interface IAlertMessage {
  mesaggeEmpty: string;
  icon: ReactNode;
  message: string;
  iconAppearance: IIconAppearance;
}

export type { IAlertMessage };
