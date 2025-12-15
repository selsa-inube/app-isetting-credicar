import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdPending } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { ActionsModal } from "@design/modals/actionsModal";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { EComponentAppearance } from "@enum/appearances";
import { IActionMobile } from "@ptypes/design/IActionMobile";
import {
  StyledActionModal,
  StyledContainer,
  StyledContainerIcon,
} from "./styles";
import { IModalPos } from "@ptypes/design/IModalPos";

const ActionMobile = (props: IActionMobile) => {
  const { actions, entry } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalPos, seIModalPos] = useState<IModalPos>({ top: 0, left: 0 });

  const modalRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

  useEffect(() => {
    const handleSecondModalState = (state: boolean) =>
      setIsSecondModalOpen(state);
    const handleThirdModalState = (state: boolean) =>
      setIsThirdModalOpen(state);

    eventBus.on("secondModalState", handleSecondModalState);
    eventBus.on("thirdModalState", handleThirdModalState);

    return () => {
      eventBus.off("secondModalState", handleSecondModalState);
      eventBus.off("thirdModalState", handleThirdModalState);
    };
  }, []);

  const calculateModalPos = () => {
    const iconEl = iconRef.current;
    if (!iconEl) return;

    const rect = iconEl.getBoundingClientRect();

    const GAP_PX = 8;
    const ALIGN_LEFT = 22;
    const top = rect.bottom + GAP_PX;
    const left = rect.left + ALIGN_LEFT;

    seIModalPos({ top, left });
  };

  const handleToggleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  useLayoutEffect(() => {
    if (!showModal) return;
    calculateModalPos();
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;

    const onUpdate = () => calculateModalPos();
    window.addEventListener("resize", onUpdate);
    window.addEventListener("scroll", onUpdate, true);

    return () => {
      window.removeEventListener("resize", onUpdate);
      window.removeEventListener("scroll", onUpdate, true);
    };
  }, [showModal]);

  useOutsideClick({
    primaryRef: modalRef,
    isSecondModalOpen,
    isThirdModalOpen,
    callback: () => {
      if (!isSecondModalOpen && !isThirdModalOpen) handleCloseModal();
    },
  });

  return (
    <StyledContainer>
      <StyledContainerIcon id="iconMenu" ref={iconRef}>
        <Icon
          appearance={EComponentAppearance.PRIMARY}
          icon={<MdPending />}
          size="20px"
          onClick={handleToggleModal}
          cursorHover
        />
      </StyledContainerIcon>

      {showModal && (
        <StyledActionModal
          id="actionModal"
          ref={modalRef}
          top={modalPos.top}
          left={modalPos.left}
        >
          <ActionsModal
            actions={actions}
            entry={entry}
            onClose={handleCloseModal}
          />
        </StyledActionModal>
      )}
    </StyledContainer>
  );
};

export { ActionMobile };
