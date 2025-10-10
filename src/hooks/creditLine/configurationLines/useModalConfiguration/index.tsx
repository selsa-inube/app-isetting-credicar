import { useEffect, useState } from "react";
import { ECreditLines } from "@enum/creditLines";
import { EComponentAppearance } from "@enum/appearances";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { errorModal } from "@config/errorModal";
import { goBackModal } from "@config/goBackModal";
import { infoErrorModal } from "@config/creditLines/generic/infoErrorModal";
import { operationTypes } from "@config/useCase";
import { sendSaveModal } from "@config/creditLines/generic/sendSaveModal";
import { IUseModalConfiguration } from "@ptypes/hooks/creditLines/IUseModalConfiguration";

const useModalConfiguration = (props: IUseModalConfiguration) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    showSaveModal,
    loadingSendData,
    hasErrorRequest,
    networkError,
    errorFetchRequest,
    showInfoErrorModal,
    hasErrorCheck,
    errorCheckData,
    handleClickInfo,
    handleToggleSaveModal,
    handleSaveModal,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleErrorSaveModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision =
      showGoBackModal ||
      showSaveModal ||
      hasErrorCheck ||
      hasErrorRequest ||
      hasError;
    setShowDecision(decision);
  }, [
    showGoBackModal,
    hasErrorRequest,
    hasErrorCheck,
    showSaveModal,
    hasError,
  ]);

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

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (hasErrorCheck) {
      return {
        ...errorModal(messageErrorStatusRequest(errorCheckData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showGoBackModal && !hasError) {
      return {
        ...goBackModal,
        onCloseModal: handleCloseModal,
        onClick: handleGoBack,
        withCancelButton: true,
        withIcon: false,
        icon: <></>,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showSaveModal) {
      return {
        ...sendSaveModal,
        onCloseModal: handleToggleSaveModal,
        onClick: handleSaveModal,
        withCancelButton: true,
        loading: loadingSendData,
        withIcon: false,
        icon: <></>,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (!errorFetchRequest && hasErrorRequest) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
        onCloseModal: handleToggleErrorSaveModal,
        onClick: handleToggleErrorSaveModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (errorFetchRequest && hasErrorRequest) {
      return {
        ...errorModal(
          messageErrorUseCases(
            networkError.status,
            operationTypes.editConfiguration,
            ECreditLines.OPTION_NAME,
          ),
        ),
        onCloseModal: handleToggleErrorSaveModal,
        onClick: handleToggleErrorSaveModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showInfoErrorModal) {
      return {
        ...infoErrorModal,
        onCloseModal: handleClickInfo,
        onClick: handleClickInfo,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalConfiguration };
