import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { IUseConfigurationConsultation } from "@ptypes/hooks/creditLines/IUseConfigurationConsultation";

const useConfigurationConsultation = (props: IUseConfigurationConsultation) => {
  const { configurationData, useCaseConfiguration } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({
    useCase: useCaseConfiguration,
  });

  const handleConfiguration = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!configurationData) {
        console.error("configurationData is undefined or null");
        return;
      }

      navigate(`/credit-lines/edit-credit-lines`, {
        state: { data: configurationData, option: "add" },
      });
    }
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
