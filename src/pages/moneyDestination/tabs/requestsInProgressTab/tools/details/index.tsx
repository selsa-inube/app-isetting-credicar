import { DetailsRequestInProcess } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/details/detailsRequestInProcess";
import { useDetailsRequestInProgress } from "@hooks/moneyDestination/useDetailsRequestInProgress";
import {
  decisionTemplate,
  textValuesBusinessRules,
} from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { useMoreDetailsRequestProgress } from "@hooks/moneyDestination/useMoreDetailsRequestProgress";
import { detailsTabsConfig } from "@config/moneyDestination/moneyDestinationTab/tabs";
import { useDetailsDestinationModal } from "@hooks/design/useDetailsDestinationModal";
import { IEntry } from "@ptypes/design/table/IEntry";
interface IDetails {
  data: IEntry;
}

const Details = (props: IDetails) => {
  const { data } = props;

  const { showModal, normalizeData, handleToggleModal } =
    useDetailsRequestInProgress(data);

  const {
    showMoreDetailsModal,
    moreDetailsData,
    decisions,
    isMoreDetails,
    onToggleMoreDetailsModal,
  } = useMoreDetailsRequestProgress(data);

  const {
    isSelected,
    isMobile,
    handleTabChange,
    filteredTabsConfig,
    defaultSelectedTab,
    decisionDeleted,
    decisionInserted,
    filteredDecisions,
  } = useDetailsDestinationModal(
    moreDetailsData,
    detailsTabsConfig,
    decisions,
    isMoreDetails,
  );

  return (
    <DetailsRequestInProcess
      data={normalizeData}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      moreDetailsData={moreDetailsData}
      showMoreDetailsModal={showMoreDetailsModal}
      detailsTabsConfig={detailsTabsConfig}
      decisionTemplate={decisionTemplate}
      decisions={filteredDecisions}
      textValuesBusinessRules={textValuesBusinessRules}
      onToggleMoreDetailsModal={onToggleMoreDetailsModal}
      isMoreDetails={isMoreDetails}
      isSelected={isSelected ?? defaultSelectedTab ?? ""}
      isMobile={isMobile}
      onTabChange={handleTabChange}
      defaultSelectedTab={defaultSelectedTab ?? ""}
      filteredTabsConfig={filteredTabsConfig}
      decisionDeleted={decisionDeleted}
      decisionInserted={decisionInserted}
    />
  );
};

export { Details };
