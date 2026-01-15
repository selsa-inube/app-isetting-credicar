import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useMoneyDestination } from "@hooks/moneyDestination/useMoneyDestination";
import { usePageLength } from "@hooks/usePageLength";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { MoneyDestinationTabUI } from "./interface";

function MoneyDestinationTab() {
  const { appData } = useContext(AuthAndPortalData);

  const {
    transformedMoneyDestination,
    searchMoneyDestination,
    loading,
    loadingEnum,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showDecision,
    modalData,
    handleToggleInfoModal,
    handleSearchMoneyDestination,
    setEntryDeleted,
  } = useMoneyDestination({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const pageLength = usePageLength();

  return (
    <MoneyDestinationTabUI
      onSearchMoneyDestination={handleSearchMoneyDestination}
      searchMoneyDestination={searchMoneyDestination}
      loading={loading || loadingEnum}
      entries={transformedMoneyDestination as IEntry[]}
      setEntryDeleted={setEntryDeleted}
      smallScreen={smallScreen}
      columnWidths={columnWidths}
      emptyDataMessage={emptyDataMessage}
      showInfoModal={showDecision}
      onToggleInfoModal={handleToggleInfoModal}
      disabledButton={disabledButton}
      modalData={modalData as IModalData}
      pageLength={pageLength}
    />
  );
}

export { MoneyDestinationTab };
