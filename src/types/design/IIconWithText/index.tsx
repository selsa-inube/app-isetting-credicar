import { EComponentAppearance } from "@enum/appearances";

interface IIconWithText {
  icon: React.ReactNode;
  text: string;
  withIconBefore?: boolean;
  withIconAfter?: boolean;
  sizeIcon?: string;
  sizeMobileIcon?: string;
  appearanceIcon?: EComponentAppearance;
  gapContainer?: string;
}

export type { IIconWithText };
