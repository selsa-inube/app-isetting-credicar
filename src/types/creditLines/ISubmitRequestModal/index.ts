import { EComponentAppearance } from "@enum/appearances";
import { IPostCheckLineRule } from "../ISaveDataRequest";

interface ISubmitRequestModal {
  description: string;
  title: string;
  unconfiguredRules: IPostCheckLineRule[];
  loading: boolean;
  language: string;
  appearanceItemIcon: EComponentAppearance;
  itemIcon: React.ReactNode;
  editOption: boolean;
  onClick: () => void;
  onCloseModal: () => void;
  withCursor?: boolean;
}

export type { ISubmitRequestModal };
