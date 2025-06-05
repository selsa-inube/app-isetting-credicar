import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IMoreDetailsModalUI {
  data: IEntry;
  decisionTemplate: IRuleDecision;
  filteredTabsConfig: IDetailsTabsConfig;
  detailsTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  textValues: IRulesFormTextValues;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  isMoreDetails: boolean;
  isMobile: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  contribQuotaInserted?: IRuleDecision[];
  contribQuotaDeleted?: IRuleDecision[];
  incomeQuotaInserted?: IRuleDecision[];
  incomeQuotaDeleted?: IRuleDecision[];
  scoreModelsInserted?: IRuleDecision[];
  scoreModelsDeleted?: IRuleDecision[];
}

export type { IMoreDetailsModalUI };
