import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IModalData } from "../IModalData";

interface IGeneralCreditPoliciesUI {
  withoutPolicies: boolean;
  smallScreen: boolean;
  loadingRequest: boolean;
  policiesTabs: ITab[];
  descriptionOptions: ICardData;
  smallScreenTab: boolean;
  showPoliciesTab: boolean;
  showrequestTab: boolean;
  isSelected: string;
  loadingPolicies: boolean;
  showAddPolicies?: boolean;
  showGoBackModal: boolean;
  modalData: IModalData;
  onTabChange: (id: string) => void;
  handleOpenModal: () => void;
  onCloseGoBackModal: () => void;
  onGoBack: () => void;
  contributionsData?: IRules[];
  incomeData?: IRules[];
  scoreModelsData?: IRules[];
  methodsData?: IRules[];
  additionalDebtorsData?: IRules[];
  realGuaranteesData?: IRules[];
}

export type { IGeneralCreditPoliciesUI };
