import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EUseCase } from "@enum/useCase";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
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
  return {
    handleEdit,
    showInfoModal,
    handleToggleInfoModal,
  };
};

export { useEditCreditConsultation };
