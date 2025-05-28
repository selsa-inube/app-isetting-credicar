import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";

interface IPayrollAgreementUI {
  isSelected: string;
  descriptionOptions: ICardData;
  showPayrollAgreementTab: boolean;
  showRequestsInProgressTab: boolean;
  smallScreen: boolean;
  smallScreenTab: boolean;
  payrollAgreementTabs: ITab[];
  handleTabChange: (id: string) => void;
}

export type { IPayrollAgreementUI };
