import { IIconAppearance, ITextSize } from "@inubekit/inubekit";
import { IAppearenceBoxContainer } from "../IAppearenceBoxContainer";
import { IModalData } from "../generalCredPolicies/IModalData";

interface IInformationBox {
  description: string;
  boxPadding: string;
  boxColor: IAppearenceBoxContainer;
  icon: React.ReactNode;
  sizeIcon: string;
  sizeDescription: ITextSize;
  appearanceIcon: IIconAppearance;
  modalData?: IModalData;
  widthBox?: string;
  heigthBox?: string;
  ellipsisText?: boolean;
  showModal?: boolean;
  descriptionModal?: string;
  onClickInfo?: () => void;
}

export type { IInformationBox };
