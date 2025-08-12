import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IUseEditPayrollConsultation } from "@ptypes/hooks/IUseEditPayrollConsultation";
import { useValidateUseCase } from "@hooks/useValidateUseCase";

const useEditPayrollConsultation = (props: IUseEditPayrollConsultation) => {
  const { payrollAgreementData, useCaseEdit } = props;
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseEdit });

  const handleEdit = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      if (!payrollAgreementData) {
        console.error("payrollAgreementData is undefined or null");
        return;
      }

      navigate(`/payroll-agreement/edit-payroll`, {
        state: { data: payrollAgreementData },
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

export { useEditPayrollConsultation };
