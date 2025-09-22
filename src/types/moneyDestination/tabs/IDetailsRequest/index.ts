import { ITab } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IDetailsTabsConfig } from "@ptypes/moneyDestination/tabs/IDetailsTabsConfig";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface IDetails {
  data: IEntry;
  decisions: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  defaultSelectedTab: string;
  detailsTabsConfig: IDetailsTabsConfig;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isMoreDetails: boolean;
  isSelected: string;
  moreDetailsData: IEntry;
  showModal: boolean;
  showMoreDetailsModal: boolean;
  textValuesBusinessRules: IRulesFormTextValues;
  titleRequest: string;
  isSelectedRequest: string;
  filteredTabs: ITab[];
  showTrazabilityData: boolean;
  showErrorData: boolean;
  withErrorRequest: boolean;
  loading: boolean;
  modalData: IModalData;
  showDecision: boolean;
  onTabRequestChange: (id: string) => void;
  onApproval: () => void;
  onTabChange: (id: string) => void;
  onToggleModal: () => void;
  onToggleMoreDetailsModal: () => void;
  decisionDeleted?: IRuleDecision[];
  decisionInserted?: IRuleDecision[];
}

export type { IDetails };
