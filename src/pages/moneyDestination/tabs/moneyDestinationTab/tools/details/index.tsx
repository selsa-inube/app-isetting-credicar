import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useDetailsDestination } from "@hooks/moneyDestination/useDetailsDestination";
import { useDetailsDestinationModal } from "@hooks/design/useDetailsDestinationModal";
import { DetailsMoneyDestination } from "@design/feedback/detailsMoneyDestination";
import { detailsTabsConfig } from "@config/moneyDestination/moneyDestinationTab/generics/detailsTabsConfig";
import { IDetails } from "@ptypes/moneyDestination/tabs/IDetails";

const Details = (props: IDetails) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { showModal, handleToggleModal, evaluateRuleData } =
    useDetailsDestination(appData, data);

  const {
    isSelected,
    isMobile,
    handleTabChange,
    filteredTabsConfig,
    defaultSelectedTab,
    filteredDecisions,
  } = useDetailsDestinationModal(
    data,
    detailsTabsConfig,
    evaluateRuleData ?? [],
  );

  return (
    <>
      <DetailsMoneyDestination
        data={data}
        showModal={showModal}
        detailsTabsConfig={detailsTabsConfig}
        evaluateRuleData={filteredDecisions}
        handleToggleModal={handleToggleModal}
        defaultSelectedTab={defaultSelectedTab ?? ""}
        filteredTabsConfig={filteredTabsConfig}
        isMobile={isMobile}
        isSelected={isSelected ?? defaultSelectedTab ?? ""}
        onTabChange={handleTabChange}
      />
    </>
  );
};

export { Details };
