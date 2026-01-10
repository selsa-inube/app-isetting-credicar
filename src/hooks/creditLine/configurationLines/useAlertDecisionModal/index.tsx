import { useEffect, useState } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";
import { alertDecisionModal } from "@config/creditLines/configuration/alertDecisionModal";
import { alertDateDecisionModal } from "@config/creditLines/configuration/alertDateDecisionModal";
import { IUseAlertDecisionModal } from "@ptypes/hooks/creditLines/IUseAlertDecisionModal";

const useAlertDecisionModal = (props: IUseAlertDecisionModal) => {
  const {
    showAlertModal,
    showAlertDateModal,
    handleToggleModal,
    handleToggleDateModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision = showAlertModal || showAlertDateModal;
    setShowDecision(decision);
  }, [showAlertModal, showAlertDateModal]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (showAlertModal) {
      return {
        ...alertDecisionModal,
        onCloseModal: handleToggleModal,
        onClick: handleToggleModal,
        withCancelButton: false,
        withIcon: true,
        icon: <MdOutlineWarningAmber />,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showAlertDateModal) {
      return {
        ...alertDateDecisionModal,
        onCloseModal: handleToggleDateModal,
        onClick: handleToggleDateModal,
        withCancelButton: false,
        withIcon: true,
        icon: <MdOutlineWarningAmber />,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const alertModal = modal();

  return { alertModal, showDecision };
};

export { useAlertDecisionModal };
