import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DetailsDestinationModal } from "@design/modals/detailsDestinationModal";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IDetailsMoneyDestination } from "@ptypes/moneyDestination/tabs/IDetailsMoneyDestination";
import { StyledContainerIcon } from "./styles";

const DetailsMoneyDestination = (props: IDetailsMoneyDestination) => {
  const { data, showModal, handleToggleModal } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  return (
    <>
      <StyledContainerIcon onClick={handleToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            Detalles
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <DetailsDestinationModal
          data={data}
          portalId={portalId}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsMoneyDestination };
