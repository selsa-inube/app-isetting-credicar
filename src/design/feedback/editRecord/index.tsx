import { MdOutlineCreate } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { editLabels } from "@config/editLabels";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IEditRecord } from "@ptypes/design/IEditRecord";
import { StyledContainerIcon } from "./styles";

const EditRecord = (props: IEditRecord) => {
  const { showInfoModal, modalData, onEdit } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  return (
    <>
      <StyledContainerIcon onClick={onEdit} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.PRIMARY}
          icon={<MdOutlineCreate />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {editLabels.title}
          </Text>
        )}
      </StyledContainerIcon>
      {showInfoModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          subtitle={modalData.subtitle}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
        />
      )}
    </>
  );
};

export { EditRecord };
