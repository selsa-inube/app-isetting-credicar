import { MdOutlineCancel } from "react-icons/md";
import { Icon, IIconAppearance, Text, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { cancelLabels } from "@config/cancelLabels";
import { ICancelRecord } from "@ptypes/design/ICancelRecord";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { StyledContainerIcon } from "./styles";

const CancelRecord = (props: ICancelRecord) => {
  const { showModal, modalData, loading, onToggleModal } = props;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  return (
    <>
      <StyledContainerIcon onClick={onToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={EComponentAppearance.DANGER}
          icon={<MdOutlineCancel />}
          size="16px"
          onClick={onToggleModal}
          cursorHover
          spacing="narrow"
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
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          onClick={modalData.onClick}
          onCloseModal={modalData.onCloseModal}
          icon={modalData.icon}
          withIcon
          withCancelButton={modalData.withCancelButton}
          appearance={
            modalData.appearance ||
            (EComponentAppearance.PRIMARY as IIconAppearance)
          }
          loading={loading}
          appearanceButton={
            modalData.appearanceButton ||
            (EComponentAppearance.PRIMARY as EComponentAppearance)
          }
        />
      )}
    </>
  );
};

export { CancelRecord };
