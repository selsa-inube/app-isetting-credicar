import { useContext } from "react";
import { useCreditLinesTab } from "@hooks/creditLine/useCreditLinesTab";
import { usePageLength } from "@hooks/usePageLength";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ICreditLinesTab } from "@ptypes/creditLines/ICreditLinesTab";
import { CreditLinesTabUI } from "./interface";

const CreditLinesTab = (props: ICreditLinesTab) => {
  const { setShowUnderConstruction } = props;
  const { appData } = useContext(AuthAndPortalData);
  const {
    creditLines,
    loadingCreditLines,
    loadingRules,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledAdd,
    modalData,
    showDecision,
    searchCreditLines,
    businessRules,
    showIcon,
    validateMissingRules,
    hasBusinessRules,
    showAddModal,
    setShowAddModal,
    handleToggleAddModal,
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
      disabledButton={disabledAdd}
      onToggleInfoModal={handleToggleInfoModal}
      setEntryDeleted={setEntryDeleted}
      businessRules={businessRules}
      showIcon={showIcon}
      validateMissingRules={validateMissingRules}
      hasBusinessRules={hasBusinessRules}
      pageLength={pageLength}
      showAddModal={showAddModal}
      onToggleAddModal={handleToggleAddModal}
      setShowAddModal={setShowAddModal}
      setShowUnderConstruction={setShowUnderConstruction}
    />
  );
};

export { CreditLinesTab };
