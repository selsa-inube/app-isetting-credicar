import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useMoneryDestinationPage } from "@hooks/moneyDestination/useMoneryDestinationPage";
import { moneyDestinationTabsConfig } from "@config/moneyDestination/tabs";
import { menuOptionsMoneyDestination } from "@config/moneyDestination/moneyDestinationTab/generics/menuOptions";
import { ICardData } from "@ptypes/home/ICardData";
import { MoneyDestinationUI } from "./interface";

const MoneyDestination = () => {
  const { businessUnitSigla, appData } = useContext(AuthAndPortalData);
  const {
    isSelected,
    descriptionOptions,
    showModal,
    showInfoModal,
    smallScreen,
    showMoneyTab,
    showRequestsTab,
    moneyDestinationTabs,
    onCloseMenu,
    onToggleModal,
    onToggleInfoModal,
    handleTabChange,
  } = useMoneryDestinationPage({
    businessUnitSigla,
    businessManager: appData.businessManager.publicCode,
    businessUnits: appData.businessUnit.publicCode,
  });

  return (
    <MoneyDestinationUI
      isSelected={
        isSelected ??
        moneyDestinationTabsConfig(smallScreen).moneyDestination.id
      }
      handleTabChange={handleTabChange}
      descriptionOptions={descriptionOptions as ICardData}
      options={menuOptionsMoneyDestination}
      showModal={showModal}
      showInfoModal={showInfoModal}
      onToggleInfoModal={onToggleInfoModal}
      onCloseMenu={onCloseMenu}
      onToggleModal={onToggleModal}
      smallScreen={smallScreen}
      showMoneyTab={showMoneyTab}
      showRequestsTab={showRequestsTab}
      moneyDestinationTabs={moneyDestinationTabs}
    />
  );
};

export { MoneyDestination };
