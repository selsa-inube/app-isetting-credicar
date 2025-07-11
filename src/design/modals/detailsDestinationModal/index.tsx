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

  const showGeneraldata = isSelected === detailsTabsConfig.generalData.id;

  const showCreditLineTab =
    !isMoreDetails &&
    isSelected === detailsTabsConfig.creditLine.id &&
    decisions.length > 0;

  const showCreditLinesIncluded =
    isMoreDetails && isSelected === detailsTabsConfig.creditLineIncluded?.id;

  const showCreditLinesRemoved =
    isMoreDetails && isSelected === detailsTabsConfig.creditLineRemoved?.id;

  const filteredTabs = Object.values(filteredTabsConfig);

  return (
    <DetailsDestinationModalUI
      data={data}
      isSelected={isSelected ?? defaultSelectedTab}
      onCloseModal={onCloseModal}
      onTabChange={onTabChange}
      portalId={portalId}
      smallScreenTab={isMobile}
      decisionTemplate={decisionTemplate}
      textValues={textValues}
      decisions={decisions}
      decisionDeleted={decisionDeleted}
      decisionInserted={decisionInserted}
      showGeneraldata={showGeneraldata}
      showCreditLineTab={showCreditLineTab}
      showCreditLinesIncluded={showCreditLinesIncluded}
      showCreditLinesRemoved={showCreditLinesRemoved}
      filteredTabs={filteredTabs}
    />
  );
};

export { DetailsDestinationModal };
export type { IDetailsDestinationModal };
