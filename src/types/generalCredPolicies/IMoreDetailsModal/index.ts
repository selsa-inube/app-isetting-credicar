import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IMoreDetailsModal {
  data: IEntry;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  decisionsMinimum: IRuleDecision[];
  decisionTemplate: IRuleDecision;
  defaultSelectedTab: string;
  detailsTabsConfig: IDetailsTabsConfig;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isMoreDetails: boolean;
  isSelected: string;
  portalId: string;
  textValues: IRulesFormTextValues;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  minimumInserted?: IRuleDecision[];
  minimumDeleted?: IRuleDecision[];
  contribQuotaInserted?: IRuleDecision[];
  contribQuotaDeleted?: IRuleDecision[];
  incomeQuotaInserted?: IRuleDecision[];
  incomeQuotaDeleted?: IRuleDecision[];
  scoreModelsInserted?: IRuleDecision[];
  scoreModelsDeleted?: IRuleDecision[];
}

export type { IMoreDetailsModal };
