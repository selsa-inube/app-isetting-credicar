import { IDetailsDestinationModal } from "@ptypes/moneyDestination/tabs/IDetailsDestinationModal";
import { DetailsDestinationModalUI } from "./interface";

const DetailsDestinationModal = (props: IDetailsDestinationModal) => {
  const {
    data,
    defaultSelectedTab,
    detailsTabsConfig,
    filteredTabsConfig,
    isMobile,
    isSelected,
    portalId,
    onCloseModal,
    onTabChange,
  } = props;

  const showGeneraldata = isSelected === detailsTabsConfig.generalData.id;

  const filteredTabs = Object.values(filteredTabsConfig);

  return (
    <DetailsDestinationModalUI
      data={data}
      isSelected={isSelected ?? defaultSelectedTab}
      onCloseModal={onCloseModal}
      onTabChange={onTabChange}
      portalId={portalId}
      smallScreenTab={isMobile}
      showGeneraldata={showGeneraldata}
      filteredTabs={filteredTabs}
    />
  );
};

export { DetailsDestinationModal };
export type { IDetailsDestinationModal };
