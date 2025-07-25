import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { IUseEditDestinationConsult } from "@ptypes/hooks/IUseEditDestinationConsult";

const useEditDestinationConsultation = (props: IUseEditDestinationConsult) => {
  const { data, useCase } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({ useCase });

  const destinationData = {
    id: data.id,
    nameDestination: data.name,
    description: data.descriptionUse,
    icon: data.iconReference,
  };

  const handleEdit = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!data) {
        console.error("destination data is undefined or null");
        return;
      }

      navigate(`/money-destination/edit-destination`, {
        state: { data: destinationData },
      });
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return {
    showInfoModal,
    handleToggleInfoModal,
    handleEdit,
  };
};

export { useEditDestinationConsultation };
