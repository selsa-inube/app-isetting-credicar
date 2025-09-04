import { useContext } from "react";
import { useCreditLinesTab } from "@hooks/creditLine/useCreditLinesTab";
import { usePageLength } from "@hooks/usePageLength";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IEntry } from "@ptypes/design/table/IEntry";
import { CreditLinesTabUI } from "./interface";

const CreditLinesTab = () => {
  const { appData } = useContext(AuthAndPortalData);
  const {
    creditLines,
    loadingCreditLines,
    loadingRules,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    modalData,
    showDecision,
    searchCreditLines,
    businessRules,
    showIcon,
    validateMissingRules,
    hasBusinessRules,
    handleSearchCreditLines,
    handleToggleInfoModal,
    setEntryDeleted,
  } = useCreditLinesTab({ businessUnits: appData.businessUnit.publicCode });

  const pageLength = usePageLength();

  return (
    <CreditLinesTabUI
      loadingRules={loadingRules}
      loadingCreditLines={loadingCreditLines}
      searchCreditLines={searchCreditLines}
      onSearchCreditLines={handleSearchCreditLines}
      columnWidths={columnWidths}
      smallScreen={smallScreen}
      entries={creditLines as IEntry[]}
      emptyDataMessage={emptyDataMessage}
      showModal={showDecision}
      modalData={modalData}
      disabledButton={disabledButton}
      onToggleInfoModal={handleToggleInfoModal}
      setEntryDeleted={setEntryDeleted}
      businessRules={businessRules}
      showIcon={showIcon}
      validateMissingRules={validateMissingRules}
      hasBusinessRules={hasBusinessRules}
      pageLength={pageLength}
    />
  );
};

export { CreditLinesTab };
