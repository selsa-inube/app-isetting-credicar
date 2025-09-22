import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";

import { MoreDetails } from "@pages/payrollAgreement/tabs/moreDetails";
import { DecisionModal } from "@design/modals/decisionModal";
import { RequestsInProcess } from "@design/modals/requestInProgressModal";
import { EComponentAppearance } from "@enum/appearances";
import { labelsOfTraceability } from "@config/payrollAgreement/requestsInProgressTab/details/labelsOfTraceability";
import { portalId } from "@config/portalId";
import { detailsLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsLabels";
import { IDetailsUI } from "@ptypes/payrollAgreement/requestInProgTab/IDetailsUI";
import { StyledContainerIcon } from "./styles";

const DetailsUI = (props: IDetailsUI) => {
  const {
    data,
    isMobile,
    abbreviatedName,
    isSelected,
    defaultSelectedTab,
    filteredTabsConfig,
    detailsTabsConfig,
    labelsDetails,
    labelsPaymentCard,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    ordinaryEliminatedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
    showModal,
    showMoreDetailsModal,
    screenTablet,
    normalizeDataMoreDetails,
    labelsOfRequestDetails,
    title,
    filteredTabs,
    isSelectedRequest,
    showTrazabilityData,
    showErrorData,
    withErrorRequest,
    loading,
    showDecision,
    modalData,
    onApproval,
    onTabRequestChange,
    onTabChange,
    onToggleModal,
    onToggleMoreDetailsModal,
  } = props;

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {detailsLabels.titleMobile}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <RequestsInProcess
          data={data}
          title={title}
          labelsOfRequest={labelsOfRequestDetails}
          labelsOfTraceability={labelsOfTraceability}
          onCloseModal={onToggleModal}
          isMobile={isMobile}
          onClick={onToggleMoreDetailsModal}
          isSelected={isSelectedRequest}
          filteredTabs={filteredTabs}
          showTrazabilityData={showTrazabilityData}
          showErrorData={showErrorData}
          onTabChange={onTabRequestChange}
          withErrorRequest={withErrorRequest}
          onApproval={onApproval}
          loading={loading}
        />
      )}

      {showMoreDetailsModal && (
        <MoreDetails
          abbreviatedName={abbreviatedName}
          isSelected={isSelected}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
          smallScreenTab={isMobile}
          detailsTabsConfig={detailsTabsConfig}
          data={normalizeDataMoreDetails}
          portalId={portalId}
          labelsDetails={labelsDetails}
          labelsPaymentCard={labelsPaymentCard}
          ordinaryPaymentData={ordinaryPaymentData}
          extraordinaryPaymentData={extraordinaryPaymentData}
          ordinaryIncludedData={ordinaryIncludedData}
          ordinaryEliminatedData={ordinaryEliminatedData}
          extraordinaryIncludedData={extraordinaryIncludedData}
          extraordinaryEliminatedData={extraordinaryEliminatedData}
          title={detailsLabels.titleMoreDetails}
          onCloseModal={onToggleMoreDetailsModal}
          onTabChange={onTabChange}
        />
      )}

      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </>
  );
};

export { DetailsUI };
