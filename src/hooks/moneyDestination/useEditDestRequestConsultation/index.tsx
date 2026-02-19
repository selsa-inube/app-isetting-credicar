import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EComponentAppearance } from "@enum/appearances";
import { userResponsibleModal } from "@config/userResponsibleModal";
import { IUseEditDestinationConsult } from "@ptypes/hooks/IUseEditDestinationConsult";

const useEditDestRequestConsultation = (props: IUseEditDestinationConsult) => {
  const { data, option } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const responsible = data.usermanamentsConfigurationrequest;

  const handleEdit = () => {
    if (responsible) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!data) {
        console.error("destination data is undefined or null");
        return;
      }

      navigate(
        `/money-destination/edit-destination/${option}/${data.id}/${data.requestNumber}`,
      );
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
        ...userResponsibleModal,
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

export { useEditDestRequestConsultation };
