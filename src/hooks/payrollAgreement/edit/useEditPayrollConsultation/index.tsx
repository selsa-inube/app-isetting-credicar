import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { IUseEditPayrollConsultation } from "@ptypes/hooks/IUseEditPayrollConsultation";

const useEditPayrollConsultation = (props: IUseEditPayrollConsultation) => {
  const { payrollAgreementData, useCaseEdit, option } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({
    useCase: useCaseEdit as string,
  });

  const handleEdit = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!payrollAgreementData) {
        console.error("payrollAgreementData is undefined or null");
        return;
      }
      navigate(`/payroll-agreement/edit-payroll/${option}`, {
        state: { data: payrollAgreementData },
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

export { useEditPayrollConsultation };
