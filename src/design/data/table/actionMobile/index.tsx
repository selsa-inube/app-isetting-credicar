import { useEffect, useState, useRef } from "react";
import { MdPending } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { ActionsModal } from "@design/modals/actionsModal";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { EComponentAppearance } from "@enum/appearances";
import { IActionMobile } from "@ptypes/design/IActionMobile";
import { StyledContainer, StyledContainerIcon } from "./styles";

const ActionMobile = (props: IActionMobile) => {
  const { actions, entry } = props;
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

  useEffect(() => {
    const handleSecondModalState = (state: boolean) => {
      setIsSecondModalOpen(state);
    };

    const handleThirdModalState = (state: boolean) => {
      setIsThirdModalOpen(state);
    };

    eventBus.on("secondModalState", handleSecondModalState);
    eventBus.on("thirdModalState", handleThirdModalState);

    return () => {
      eventBus.off("secondModalState", handleSecondModalState);
      eventBus.off("thirdModalState", handleThirdModalState);
    };
  }, []);

  const handleToggleModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useOutsideClick({
    primaryRef: modalRef,
    isSecondModalOpen: isSecondModalOpen,
    isThirdModalOpen: isThirdModalOpen,
    callback: () => {
      if (!isSecondModalOpen) {
        handleCloseModal();
      }

      if (!isThirdModalOpen) {
        handleCloseModal();
      }
    },
  });

  return (
    <StyledContainer>
      <StyledContainerIcon>
        <Icon
          appearance={EComponentAppearance.PRIMARY}
          icon={<MdPending />}
          size="20px"
          onClick={handleToggleModal}
          cursorHover
        />
      </StyledContainerIcon>
      {showModal && (
        <div id="actionModal" ref={modalRef}>
          <ActionsModal
            actions={actions}
            entry={entry}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </StyledContainer>
  );
};

export { ActionMobile };
