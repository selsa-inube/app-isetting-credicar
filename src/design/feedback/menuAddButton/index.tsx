import { MdOutlineMoreVert } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { disabledModal } from "@src/config/disabledModal";
import { IMenuAddButton } from "@ptypes/design/IMenuAddButton";
import { Menu } from "../menu";

const MenuAddButton = (props: IMenuAddButton) => {
  const {
    showModal,
    showInfoModal,
    options,
    onToggleInfoModal,
    onCloseMenu,
    onToggleModal,
  } = props;

  return (
    <>
      <Icon
        icon={<MdOutlineMoreVert />}
        appearance={ComponentAppearance.DARK}
        onClick={onToggleModal}
        cursorHover
      />
      {showModal && (
        <Menu
          options={options}
          onToggleInfoModal={onToggleInfoModal}
          onClose={onCloseMenu}
        />
      )}
      {showInfoModal && (
        <DecisionModal
          portalId="portal"
          title={disabledModal.title}
          actionText={disabledModal.actionText}
          description={disabledModal.description}
          subtitle={disabledModal.subtitle}
          onCloseModal={onToggleInfoModal}
          appearance={ComponentAppearance.PRIMARY}
          appearanceButton={ComponentAppearance.PRIMARY}
          onClick={onToggleInfoModal}
          withCancelButton={false}
        />
      )}
    </>
  );
};
export { MenuAddButton };
