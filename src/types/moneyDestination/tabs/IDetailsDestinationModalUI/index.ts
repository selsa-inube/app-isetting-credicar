import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ITab } from "@inubekit/inubekit";

interface IDetailsDestinationModalUI {
  data: IEntry;
  decisionTemplate: IRuleDecision;
  filteredTabs: ITab[];
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  textValues: IRulesFormTextValues;
  decisions: IRuleDecision[];
  showGeneraldata: boolean;
  showCreditLineTab: boolean;
  showCreditLinesIncluded: boolean;
  showCreditLinesRemoved: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
  decisionDeleted?: IRuleDecision[];
  decisionInserted?: IRuleDecision[];
}

export type { IDetailsDestinationModalUI };
