import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { RequestsInProcess } from "@design/modals/requestInProgressModal";
import { DetailsDestinationModal } from "@design/modals/detailsDestinationModal";
import { DecisionModal } from "@design/modals/decisionModal";
import { EComponentAppearance } from "@enum/appearances";
import { labelsOfRequest } from "@config/moneyDestination/requestsInProgressTab/details/labelsOfRequest";
import { labelsOfTraceability } from "@config/moneyDestination/requestsInProgressTab/details/labelsOfTraceability";
import { detailsLabels } from "@config/moneyDestination/requestsInProgressTab/details/detailsLabels";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IDetails } from "@ptypes/moneyDestination/tabs/IDetailsRequest";
import { StyledContainerIcon } from "./styles";

const DetailsRequestInProcess = (props: IDetails) => {
  const {
    data,
    isMobile,
    moreDetailsData,
    showModal,
    showMoreDetailsModal,
    titleRequest,
    isSelectedRequest,
    filteredTabs,
    showTrazabilityData,
    showErrorData,
    withErrorRequest,
    loading,
    modalData,
    showDecision,
    labelButton,
    iconButton,
    onTabRequestChange,
    onClick,
    onToggleModal,
    onToggleMoreDetailsModal,
  } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

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
            {detailsLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <RequestsInProcess
          data={data}
          labelsOfRequest={labelsOfRequest}
          labelsOfTraceability={labelsOfTraceability}
          onCloseModal={onToggleModal}
          isMobile={isMobile}
          onClick={onToggleMoreDetailsModal}
          title={titleRequest}
          isSelected={isSelectedRequest}
          filteredTabs={filteredTabs}
          showTrazabilityData={showTrazabilityData}
          showErrorData={showErrorData}
          withErrorRequest={withErrorRequest}
          loading={loading}
          onTabChange={onTabRequestChange}
          onThirdClick={onClick}
          labelButton={labelButton}
          iconButton={iconButton}
        />
      )}

      {showMoreDetailsModal && (
        <DetailsDestinationModal
          data={moreDetailsData}
          portalId={portalId}
          onCloseModal={onToggleMoreDetailsModal}
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

export { DetailsRequestInProcess };
