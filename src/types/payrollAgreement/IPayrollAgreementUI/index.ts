import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { IMenuOptions } from "@ptypes/design/IMenuOptions";

interface IPayrollAgreementUI {
  isSelected: string;
  descriptionOptions: ICardData;
  showPayrollAgreementTab: boolean;
  showRequestsInProgressTab: boolean;
  smallScreen: boolean;
  payrollAgreementTabs: ITab[];
  showModal: boolean;
  showInfoModal: boolean;
  options: IMenuOptions[];
  onToggleInfoModal: () => void;
  onCloseMenu: () => void;
  onToggleModal: () => void;
  handleTabChange: (id: string) => void;
}

export type { IPayrollAgreementUI };
