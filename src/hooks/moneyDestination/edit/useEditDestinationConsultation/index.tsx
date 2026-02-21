import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { IUseEditDestinationConsult } from "@ptypes/hooks/IUseEditDestinationConsult";

const useEditDestinationConsultation = (props: IUseEditDestinationConsult) => {
  const { data, useCase, option } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({ useCase });

  const destinationData = {
    id: data.id,
    nameDestination: data.name,
    description: data.descriptionUse,
    icon: data.iconReference,
    typeDestination: data.typeDestination,
    creditLine: data.creditLine,
  };

  const handleEdit = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!data) {
        console.error("destination data is undefined or null");
        return;
      }

      navigate(`/money-destination/edit-destination/${option}`, {
        state: { data: destinationData },
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
    showInfoModal,
    modalData,
    handleToggleInfoModal,
    handleEdit,
  };
};

export { useEditDestinationConsultation };
