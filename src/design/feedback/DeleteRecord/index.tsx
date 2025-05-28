import { MdDeleteOutline } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { DecisionModal } from "@design/modals/decisionModal";
import { StyledContainerIcon } from "./styles";

interface IDelete {
  showModal: boolean;
  messageDelete: IMessageModal;
  loading: boolean;
  onToggleModal: () => void;
  onClick: () => void;
}

const DeleteRecord = (props: IDelete) => {
  const { showModal, messageDelete, loading, onToggleModal, onClick } = props;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

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
        {screenTablet && (
          <Text type="body" size="medium">
            Eliminar
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
