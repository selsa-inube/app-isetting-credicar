import { TNavItem } from "@ptypes/creditLines/TNavItem";

interface INavigation {
  disabledBack: boolean;
  disabledNext: boolean;
  disabledSend: boolean;
  loadingBackAndNext: boolean;
  loadingSend: boolean;
  handleClickSend: () => void;
  handleBack: () => void;
  handleNext: () => void;
  sequence: TNavItem[];
  currentIndex: number;
}

export type { INavigation };
