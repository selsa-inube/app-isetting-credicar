import { MdDeleteOutline } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { IDelete } from "@ptypes/design/IDelete";
import { deleteRecordLabels } from "@config/deleteRecordLabels";
import { StyledContainerIcon } from "./styles";

const DeleteRecord = (props: IDelete) => {
  const {
    showModal,
    messageDelete,
    loading,
    withActionMobile = true,
    onToggleModal,
    onClick,
  } = props;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

  const showTitle = screenTablet && withActionMobile;

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={ComponentAppearance.DANGER}
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
          portalId="portal"
          title={messageDelete.title}
          actionText={messageDelete.actionText}
          description={messageDelete.description}
          onClick={onClick}
          onCloseModal={onToggleModal}
          appearance={ComponentAppearance.DANGER}
          loading={loading}
          appearanceButton={ComponentAppearance.DANGER}
        />
      )}
    </>
  );
};

export { DeleteRecord };
