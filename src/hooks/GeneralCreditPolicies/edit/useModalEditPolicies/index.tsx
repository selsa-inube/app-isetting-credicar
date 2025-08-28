import { useEffect, useState } from "react";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { EComponentAppearance } from "@enum/appearances";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { goBackModal } from "@config/goBackModal";
import { disabledModal } from "@config/disabledModal";
import { sendEditedModal } from "@config/generalCreditPolicies/generic/sendEditModal";
import { IUseModalEditPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseModalEditPolicies";

const useModalEditPolicies = (props: IUseModalEditPolicies) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showInfoModal,
    showDateModal,
    handleToggleDateModal,
    handleToggleInfoModal,
    handleFinishForm,
    handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision =
      showGoBackModal || showInfoModal || showDateModal || hasError;
    setShowDecision(decision);
  }, [showInfoModal, showInfoModal, showGoBackModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      loading: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
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
            operationTypes.editError,
            EGeneralPolicies.OPTION_NAME,
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
        onCloseModal: handleCloseGoBackModal,
        onClick: handleGoBack,
        withCancelButton: true,
      };
    }

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
      };
    }

    if (showDateModal) {
      return {
        ...sendEditedModal,
        onCloseModal: handleToggleDateModal,
        onClick: handleFinishForm,
        withCancelButton: false,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalEditPolicies };
