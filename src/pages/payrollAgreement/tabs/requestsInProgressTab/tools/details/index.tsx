import { useDetailsRequestInProgress } from "@hooks/payrollAgreement/useDetailsRequestInProgress";
import { labelsDetails } from "@config/payrollAgreement/payrollAgreementTab/details/labels";
import { labelsPaymentCard } from "@config/payrollAgreement/payrollAgreementTab/details/labelsPaymentCard";
import { useDetailsPayrollAgreement } from "@hooks/payrollAgreement/useDetailsPayrollAgreement";
import { detailsRequestPayrollTabsConfig } from "@config/payrollAgreement/requestsInProgressTab/tabs";
import { IDetails } from "@ptypes/payrollAgreement/requestInProgTab/IDetails";
import { IEntry } from "@ptypes/design/table/IEntry";
import { DetailsUI } from "./interface";

const Details = (props: IDetails) => {
  const { data } = props;

  const {
    showModal,
    screenTablet,
    normalizeData,
    filteredRequestTabs,
    showTrazabilityData,
    showErrorData,
    modalData,
    showDecision,
    withErrorRequest,
    loading,
    isSelected: isSelectedRequest,
    defaultSelectedTab: defaultSelectedRequestTab,
    handleApproval,
    handleToggleModal,
    handleTabRequestChange,
  } = useDetailsRequestInProgress({ data });

  const {
    showModal: showMoreDetailsModal,
    normalizeData: normalizeDataMoreDetails,
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    labelsOfRequestDetails,
    title,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    ordinaryEliminatedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
    handleTabChange,
    handleToggleModal: onToggleMoreDetailsModal,
  } = useDetailsPayrollAgreement({
    data: normalizeData,
    detailsTabsConfig: detailsRequestPayrollTabsConfig,
    showModalReq: showModal,
  });

  return (
    <DetailsUI
      data={normalizeData}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      showMoreDetailsModal={showMoreDetailsModal}
      onToggleMoreDetailsModal={onToggleMoreDetailsModal}
      isMobile={isMobile}
      screenTablet={screenTablet}
      abbreviatedName={data.configurationRequestData.abbreviatedName ?? ""}
      isSelected={isSelected ?? defaultSelectedTab ?? ""}
      defaultSelectedTab={defaultSelectedTab ?? ""}
      filteredTabsConfig={filteredTabsConfig}
      detailsTabsConfig={detailsRequestPayrollTabsConfig}
      labelsDetails={labelsDetails}
      labelsPaymentCard={labelsPaymentCard}
      ordinaryPaymentData={ordinaryPaymentData() as IEntry[]}
      extraordinaryPaymentData={extraordinaryPaymentData() as IEntry[]}
      ordinaryIncludedData={ordinaryIncludedData() as IEntry[]}
      ordinaryEliminatedData={ordinaryEliminatedData() as IEntry[]}
      extraordinaryIncludedData={extraordinaryIncludedData() as IEntry[]}
      extraordinaryEliminatedData={extraordinaryEliminatedData() as IEntry[]}
      onTabChange={handleTabChange}
      normalizeDataMoreDetails={normalizeDataMoreDetails}
      labelsOfRequestDetails={labelsOfRequestDetails}
      title={title}
      filteredTabs={filteredRequestTabs}
      showTrazabilityData={showTrazabilityData}
      withErrorRequest={withErrorRequest}
      loading={loading}
      onApproval={handleApproval}
      showErrorData={showErrorData}
      onTabRequestChange={handleTabRequestChange}
      showDecision={showDecision}
      modalData={modalData}
      isSelectedRequest={isSelectedRequest ?? defaultSelectedRequestTab ?? ""}
    />
  );
};

export { Details };
