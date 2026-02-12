import { IRuleDecision } from "@isettingkit/input";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";
import { IDecisionsDetails } from "../forms/IDecisionsDetails";

interface IMoreDetailsModal {
  data: IEntry;
  decisions: IDecisionsDetails;
  defaultSelectedTab: string;
  detailsTabsConfig: IDetailsTabsConfig;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isMoreDetails: boolean;
  isSelected: string;
  portalId: string;
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
  basicNotifFormatInserted?: IRuleDecision[];
  basicNotifFormatDeleted?: IRuleDecision[];
  basicNotifRecipientInserted?: IRuleDecision[];
  basicNotifRecipientDeleted?: IRuleDecision[];
  minCredBureauRiskScoreInserted?: IRuleDecision[];
  minCredBureauRiskScoreDeleted?: IRuleDecision[];
  notifChannelInserted?: IRuleDecision[];
  notifChannelDeleted?: IRuleDecision[];
  riskScoreApiUrlInserted?: IRuleDecision[];
  riskScoreApiUrlDeleted?: IRuleDecision[];
}

export type { IMoreDetailsModal };
