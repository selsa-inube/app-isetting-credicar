import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text } from "@inubekit/inubekit";

import { DecisionModal } from "@design/modals/decisionModal";
import { RequestsInProcess } from "@design/modals/requestInProgressModal";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { labelsOfTraceability } from "@config/creditLines/requestInProgressTab/labelsOfTraceability";
import { detailsLabels } from "@config/creditLines/requestInProgressTab/detailsLabels";
import { IDetailsRequestUI } from "@ptypes/creditLines/IDetailsRequestUI";
import { StyledContainerIcon } from "./styles";
import { MoreDetails } from "./moreDetails";

const DetailsUI = (props: IDetailsRequestUI) => {
  const {
    data,
    filteredTabs,
    isMobile,
    isSelectedRequest,
    labelsOfRequest,
    loading,
    modalData,
    screenTablet,
    showDecision,
    showErrorData,
    showModal,
    showTrazabilityData,
    title,
    withErrorRequest,
    labelButton,
    iconButton,
    showMoreDetailsModal,
    useCaseName,
    normalizeDetails,
    onMoreDetails,
    onClick,
    onTabRequestChange,
    onToggleModal,
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
          labelsOfRequest={labelsOfRequest}
          labelsOfTraceability={labelsOfTraceability}
          onCloseModal={onToggleModal}
          isMobile={isMobile}
          onClick={onMoreDetails}
          isSelected={isSelectedRequest}
          filteredTabs={filteredTabs}
          showTrazabilityData={showTrazabilityData}
          showErrorData={showErrorData}
          onTabChange={onTabRequestChange}
          withErrorRequest={withErrorRequest}
          onThirdClick={onClick}
          loading={loading}
          labelButton={labelButton}
          iconButton={iconButton}
        />
      )}

      {showMoreDetailsModal && (
        <MoreDetails data={normalizeDetails} useNameRequest={useCaseName} />
      )}

      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          moreDetails={modalData.moreDetails}
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
