import { useDetailsRequestInProgress } from "@hooks/payrollAgreement/useDetailsRequestInProgress";
import { labelsOfRequest } from "@config/creditLines/requestInProgressTab/labelsOfRequest";
import { IDetails } from "@ptypes/payrollAgreement/requestInProgTab/IDetails";
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
    title,
    isMobile,
    isSelected: isSelectedRequest,
    defaultSelectedTab: defaultSelectedRequestTab,
    statusRequestData,
    handleToggleModal,
    handleTabRequestChange,
  } = useDetailsRequestInProgress({ data });

  return (
    <DetailsUI
      data={normalizeData}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      isMobile={isMobile}
      screenTablet={screenTablet}
      title={title}
      labelsOfRequest={labelsOfRequest}
      filteredTabs={filteredRequestTabs}
      showTrazabilityData={showTrazabilityData}
      withErrorRequest={withErrorRequest}
      loading={loading}
      onClick={statusRequestData.onClick}
      showErrorData={showErrorData}
      onTabRequestChange={handleTabRequestChange}
      showDecision={showDecision}
      modalData={modalData}
      isSelectedRequest={isSelectedRequest ?? defaultSelectedRequestTab ?? ""}
      labelButton={statusRequestData.textButton}
      iconButton={statusRequestData.iconButton}
    />
  );
};

export { Details };
