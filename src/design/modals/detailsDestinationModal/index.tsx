import { IDetailsDestinationModal } from "@ptypes/moneyDestination/tabs/IDetailsDestinationModal";
import { DetailsDestinationModalUI } from "./interface";

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
