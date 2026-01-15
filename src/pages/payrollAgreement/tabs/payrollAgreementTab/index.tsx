import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { usePageLength } from "@hooks/usePageLength";
import { usePayrollAgreementTab } from "@hooks/payrollAgreement/usePayrollAgreementTab";
import { IEntry } from "@ptypes/design/table/IEntry";
import { PayrollAgreementTabUI } from "./interface";

const PayrollAgreementTab = () => {
  const { appData } = useContext(AuthAndPortalData);

  const {
    payrollAgreement,
    searchPayrollAgreement,
    loading,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showDecision,
    modalData,
    handleToggleInfoModal,
    setEntryDeleted,
    handleSearchPayrollAgreement,
  } = usePayrollAgreementTab({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const pageLength = usePageLength();

  return (
    <PayrollAgreementTabUI
      onSearchPayrollAgreement={handleSearchPayrollAgreement}
      searchPayrollAgreement={searchPayrollAgreement}
      loading={loading}
      entries={payrollAgreement as IEntry[]}
      setEntryDeleted={setEntryDeleted}
      smallScreen={smallScreen}
      columnWidths={columnWidths}
      pageLength={pageLength}
      emptyDataMessage={emptyDataMessage}
      showInfoModal={showDecision}
      onToggleInfoModal={handleToggleInfoModal}
      disabledButton={disabledButton}
      modalData={modalData}
    />
  );
};

export { PayrollAgreementTab };
