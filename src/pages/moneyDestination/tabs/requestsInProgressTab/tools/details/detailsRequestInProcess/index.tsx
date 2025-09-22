import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { labelsOfRequest } from "@config/moneyDestination/requestsInProgressTab/details/labelsOfRequest";
import { labelsOfTraceability } from "@config/moneyDestination/requestsInProgressTab/details/labelsOfTraceability";
import { DetailsDestinationModal } from "@design/modals/detailsDestinationModal";
import { mediaQueryTablet } from "@config/environment";
import { detailsLabels } from "@config/moneyDestination/requestsInProgressTab/details/detailsLabels";
import { IDetails } from "@ptypes/moneyDestination/tabs/IDetailsRequest";
import { StyledContainerIcon } from "./styles";
import { RequestsInProcess } from "../requestsInProcess";

const DetailsRequestInProcess = (props: IDetails) => {
  const {
    data,
    isMobile,
    moreDetailsData,
    showModal,
    showMoreDetailsModal,
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
        />
      )}

      {showMoreDetailsModal && (
        <DetailsDestinationModal
          data={moreDetailsData}
          portalId="portal"
          onCloseModal={onToggleMoreDetailsModal}
        />
      )}
    </>
  );
};

export { DetailsRequestInProcess };
