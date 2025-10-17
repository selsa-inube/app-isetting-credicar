import { EComponentAppearance } from "@enum/appearances";
import { IPostCheckLineRule } from "../ISaveDataRequest";

interface ISubmitModalData {
  title: string;
  description: string;
  unconfiguredRules: IPostCheckLineRule[];
  appearanceItemIcon: EComponentAppearance;
  loading: boolean;
  itemIcon: React.ReactNode;
  onCloseModal: () => void;
  onClick: () => void;
}

export type { ISubmitModalData };
