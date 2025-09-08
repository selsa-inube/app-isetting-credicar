import { useEffect, useState } from "react";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { deleteCreditModal } from "@config/creditLines/creditLinesTab/generic/deleteCreditModal";
import { IUseModalDeleteCredit } from "@ptypes/hooks/creditLines/IUseModalDeleteCredit";

const useModalDeleteCreditLine = (props: IUseModalDeleteCredit) => {
  const {
    loading,
    showInfoModal,
    showModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision = showInfoModal || showModal;
    setShowDecision(decision);
  }, [showInfoModal, showModal]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      loading: false,
      withCancelButton: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showModal) {
      return {
        ...deleteCreditModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
        loading: loading,
        appearance: EComponentAppearance.DANGER,
        appearanceButton: EComponentAppearance.DANGER,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalDeleteCreditLine };
