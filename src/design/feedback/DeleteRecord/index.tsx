import { MdDeleteOutline } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { IDelete } from "@ptypes/design/IDelete";
import { deleteRecordLabels } from "@config/deleteRecordLabels";
import { StyledContainerIcon } from "./styles";
import { portalId } from "@config/portalId";
import { disabledModal } from "@config/disabledModal";
import { mediaQueryTablet } from "@config/environment";

const DeleteRecord = (props: IDelete) => {
  const {
    showModal,
    messageDelete,
    loading,
    withActionMobile = true,
    showInfoModal,
    onToggleInfoModal,
    onToggleModal,
    onClick,
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
      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={messageDelete.title}
          actionText={messageDelete.actionText}
          description={messageDelete.description}
          onClick={onClick}
          onCloseModal={onToggleModal}
          appearance={EComponentAppearance.DANGER}
          loading={loading}
          appearanceButton={EComponentAppearance.DANGER}
        />
      )}

      {showInfoModal && (
        <DecisionModal
          portalId={portalId}
          title={disabledModal.title}
          actionText={disabledModal.actionText}
          description={disabledModal.description}
          subtitle={disabledModal.subtitle}
          onCloseModal={onToggleInfoModal}
          onClick={onToggleInfoModal}
          withCancelButton={false}
        />
      )}
    </>
  );
};

export { DeleteRecord };
