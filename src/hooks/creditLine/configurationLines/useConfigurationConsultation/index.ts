import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EUseCase } from "@enum/useCase";
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
  return {
    handleConfiguration,
    showInfoModal,
    handleToggleInfoModal,
  };
};

export { useConfigurationConsultation };
