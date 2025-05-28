import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { DetailsDestinationModalUI } from "./interface";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "./types";
interface IDetailsDestinationModal {
  data: IEntry;
  decisions: IRuleDecision[];
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
  decisionDeleted?: IRuleDecision[];
  decisionInserted?: IRuleDecision[];
}

const DetailsDestinationModal = (props: IDetailsDestinationModal) => {
  const {
    data,
    decisions,
    decisionDeleted,
    decisionInserted,
    decisionTemplate,
    defaultSelectedTab,
    detailsTabsConfig,
    filteredTabsConfig,
    isMobile,
    isMoreDetails,
    isSelected,
    portalId,
    textValues,
    onCloseModal,
    onTabChange,
  } = props;

  return (
    <DetailsDestinationModalUI
      data={data}
      filteredTabsConfig={filteredTabsConfig}
      detailsTabsConfig={detailsTabsConfig}
      isSelected={isSelected ?? defaultSelectedTab}
      onCloseModal={onCloseModal}
      onTabChange={onTabChange}
      portalId={portalId}
      smallScreenTab={isMobile}
      decisionTemplate={decisionTemplate}
      textValues={textValues}
      decisions={decisions}
      isMoreDetails={isMoreDetails}
      decisionDeleted={decisionDeleted}
      decisionInserted={decisionInserted}
    />
  );
};

export { DetailsDestinationModal };
export type { IDetailsDestinationModal };
