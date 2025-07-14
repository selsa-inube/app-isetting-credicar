import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { detailsTabsConfig } from "@config/creditLines/details/tabs";
import { DetailsCreditLinesModal } from "@design/modals/detailsCreditLinesModal";
import { IDetails } from "@ptypes/creditLines/IDetails";
import { detailLabels } from "@config/creditLines/details/detailLabels";
import { StyledContainerIcon } from "./styles";

const Details = (props: IDetails) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const screenTablet = useMediaQuery("(max-width: 1200px)");

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
            {detailLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <DetailsCreditLinesModal
          data={data}
          detailsTabsConfig={detailsTabsConfig}
          portalId="portal"
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { Details };
