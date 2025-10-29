import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IMoreDetailsModalUI {
  data: IEntry;
  decisionTemplate: IRuleDecision;
  filteredTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  textValues: IRulesFormTextValues;
  decisionsReciprocity: IRuleDecision[];
  decisionsIncomePortfolio: IRuleDecision[];
  decisionsScoreModels: IRuleDecision[];
  isMobile: boolean;
  showGeneralDecisionsTab: boolean;
  showDecisionsRecip: boolean;
  showContribInserted: boolean;
  showContribDeleted: boolean;
  showDecisionsIncome: boolean;
  showIncomeInserted: boolean;
  showIncomeDeleted: boolean;
  showScoreModels: boolean;
  showScoreModelsInserted: boolean;
  showScoreModelsDeleted: boolean;
  showMinimum: boolean;
  showMinimumInserted: boolean;
  showMinimumDeleted: boolean;
  decisionsMinimum: IRuleDecision[];
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  contribQuotaInserted?: IRuleDecision[];
  contribQuotaDeleted?: IRuleDecision[];
  incomeQuotaInserted?: IRuleDecision[];
  incomeQuotaDeleted?: IRuleDecision[];
  scoreModelsInserted?: IRuleDecision[];
  scoreModelsDeleted?: IRuleDecision[];
  minimumInserted?: IRuleDecision[];
  minimumDeleted?: IRuleDecision[];
}

export type { IMoreDetailsModalUI };
