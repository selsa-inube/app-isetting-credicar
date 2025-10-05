import { IPostCheckLineRule } from "../ISaveDataRequest";

interface ISubmitRequestModal {
  description: string;
  title: string;
  unconfiguredRules: IPostCheckLineRule[];
  loading: boolean;
  language: string;
  onClick: () => void;
  onCloseModal: () => void;
}

export type { ISubmitRequestModal };
