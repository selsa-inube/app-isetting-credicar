import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IPostCheckLineRule } from "../ISaveDataRequest";

interface ISubmitRequestModal {
  description: string;
  title: string;
  unconfiguredRules: IPostCheckLineRule[];
  loading: boolean;
  language: string;
  showModal: boolean;
  modalData: IModalData;
  onClickInfo: () => void;
  onClick: () => void;
  onCloseModal: () => void;
}

export type { ISubmitRequestModal };
