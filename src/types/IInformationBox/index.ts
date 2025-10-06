import { IIconAppearance, ITextSize } from "@inubekit/inubekit";
import { IAppearenceBoxContainer } from "../IAppearenceBoxContainer";

interface IInformationBox {
  description: string;
  boxPadding: string;
  boxColor: IAppearenceBoxContainer;
  icon: React.ReactNode;
  sizeIcon: string;
  sizeDescription: ITextSize;
  appearanceIcon: IIconAppearance;
  widthBox?: string;
  heigthBox?: string;
  ellipsisText?: boolean;
  descriptionModal?: string;
  onClickInfo?: (error?: string) => void;
  setDescriptionError?: React.Dispatch<React.SetStateAction<string>>;
}

export type { IInformationBox };
