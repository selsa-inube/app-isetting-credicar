import { MdDeleteOutline } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { deleteRecordLabels } from "@config/deleteRecordLabels";
import { StyledContainerIcon } from "./styles";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IDelete } from "@ptypes/design/IDelete";

const DeleteRecord = (props: IDelete) => {
  const {
    withActionMobile = true,
    modalData,
    showDecision,
    onToggleModal,
  } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  const showTitle = screenTablet && withActionMobile;

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.DANGER}
          icon={<MdDeleteOutline />}
          size="16px"
          onClick={onToggleModal}
          cursorHover
          spacing="narrow"
        />
        {showTitle && (
          <Text type="body" size="medium">
            {deleteRecordLabels.title}
          </Text>
        )}
      </StyledContainerIcon>

      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          onClick={modalData.onClick}
          onCloseModal={modalData.onCloseModal}
          appearance={modalData.appearance}
          loading={modalData.loading}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </>
  );
};

export { DeleteRecord };
