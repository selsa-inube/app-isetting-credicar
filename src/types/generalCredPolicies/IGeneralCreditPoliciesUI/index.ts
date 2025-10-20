import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { IModalData } from "../IModalData";
import { IRuleDecisionExtended } from "@src/types/IRuleDecisionExtended";

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
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
}

export type { IGeneralCreditPoliciesUI };
