import { useEffect, useState } from "react";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { goBackModal } from "@config/goBackModal";
import { IUseModalAddPayroll } from "@ptypes/hooks/payrollAgreement/IUseModalAddPayroll";

const useModalAddPayroll = (props: IUseModalAddPayroll) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision = showGoBackModal || hasError;
    setShowDecision(decision);
  }, [showGoBackModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
    };

    if (!loading && !errorFetchRequest && hasError) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
      };
    }

    if (errorFetchRequest && hasError) {
      return {
        ...errorModal(
          messageErrorUseCases(
            networkError.status,
            operationTypes.addError,
            EPayrollAgreement.OPTION_NAME,
          ),
        ),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
      };
    }

    if (showGoBackModal && !errorFetchRequest && !hasError) {
      return {
        ...goBackModal,
        onCloseModal: handleCloseModal,
        onClick: handleGoBack,
        withCancelButton: true,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalAddPayroll };
