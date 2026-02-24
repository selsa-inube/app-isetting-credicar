import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { disabledModal } from "@config/disabledModal";
import { IUseEditCreditConsultation } from "@ptypes/hooks/creditLines/IUseEditCreditConsultation";

const useEditCreditConsultation = (props: IUseEditCreditConsultation) => {
  const { creditLineData, useCaseEdit } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseEdit });

  const handleEdit = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!creditLineData) {
        console.error("creditLineData is undefined or null");
        return;
      }

      navigate(`/credit-lines/edit-credit-lines`, {
        state: { data: creditLineData, option: EUseCase.EDIT },
      });
    }
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
    handleEdit,
    showInfoModal,
    modalData,
    handleToggleInfoModal,
  };
};

export { useEditCreditConsultation };
