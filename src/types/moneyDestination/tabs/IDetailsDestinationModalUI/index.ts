import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "../IDetailsTabsConfig";

interface IDetailsDestinationModalUI {
  data: IEntry;
  decisionTemplate: IRuleDecision;
  filteredTabsConfig: IDetailsTabsConfig;
  detailsTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  textValues: IRulesFormTextValues;
  decisions: IRuleDecision[];
  isMoreDetails: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  decisionDeleted?: IRuleDecision[];
  decisionInserted?: IRuleDecision[];
}

export type { IDetailsDestinationModalUI };
