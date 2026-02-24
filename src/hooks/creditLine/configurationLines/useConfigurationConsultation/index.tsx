import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { IUseConfigurationConsultation } from "@ptypes/hooks/creditLines/IUseConfigurationConsultation";

const useConfigurationConsultation = (props: IUseConfigurationConsultation) => {
  const { configurationData } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfiguration = () => {
    if (!configurationData) {
      console.error("configurationData is undefined or null");
      return;
    }

    navigate(`/credit-lines/edit-credit-lines`, {
      state: { data: configurationData, option: EUseCase.ADD },
    });
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

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

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    handleConfiguration,
    showInfoModal,
    modalData,
    handleToggleInfoModal,
  };
};

export { useConfigurationConsultation };
