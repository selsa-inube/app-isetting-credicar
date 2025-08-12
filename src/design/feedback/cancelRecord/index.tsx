import { MdOutlineCancel } from "react-icons/md";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { notCancelStatus } from "@config/status/notCancelStatus";
import { cancelLabels } from "@config/cancelLabels";
import { ICancelRecord } from "@ptypes/design/ICancelRecord";
import { disabledModal } from "@config/disabledModal";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { StyledContainerIcon } from "./styles";

const CancelRecord = (props: ICancelRecord) => {
  const {
    showModal,
    status,
    messageCancel,
    loading,
    showInfoModal,
    onToggleInfoModal,
    onToggleModal,
    onClick,
  } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  const notCancel = notCancelStatus.includes(status);

  return (
    <>
      <StyledContainerIcon
        onClick={!notCancel ? onToggleModal : undefined}
        $isTablet={screenTablet}
      >
        <Icon
          appearance={EComponentAppearance.DANGER}
          icon={<MdOutlineCancel />}
          size="16px"
          onClick={onToggleModal}
          cursorHover
          spacing="narrow"
          disabled={notCancel}
        />
        {screenTablet && (
          <Text type="body" size="medium">
            {cancelLabels.title}
          </Text>
        )}
      </StyledContainerIcon>
      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={messageCancel.title}
          actionText={messageCancel.actionText}
          description={messageCancel.description}
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

export { CancelRecord };
