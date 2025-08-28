import { useEffect, useState } from "react";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { EComponentAppearance } from "@enum/appearances";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { deleteMoneyDestinationModal } from "@config/moneyDestination/moneyDestinationTab/generics/deleteMoneyDestinationModal";
import { disabledModal } from "@config/disabledModal";
import { IUseModalDeleteDestination } from "@ptypes/hooks/moneyDestination/IUseModalDeleteDestination";

const useModalDeleteDestination = (props: IUseModalDeleteDestination) => {
  const {
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showInfoModal,
    showModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
    handleToggleErrorModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision = showInfoModal || showModal || hasError;
    setShowDecision(decision);
  }, [showInfoModal, showModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      loading: false,
      withCancelButton: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && !errorFetchRequest && hasError) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (errorFetchRequest && hasError) {
      return {
        ...errorModal(
          messageErrorUseCases(
            networkError.status,
            operationTypes.deleteError,
            EPayrollAgreement.OPTION_NAME,
          ),
        ),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showModal) {
      return {
        ...deleteMoneyDestinationModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
        loading: loading,
        appearance: EComponentAppearance.DANGER,
        appearanceButton: EComponentAppearance.DANGER,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalDeleteDestination };
