import { useEffect, useState } from "react";
import { EMoneyDestination } from "@enum/moneyDestination";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { sendEditedModal } from "@config/moneyDestination/moneyDestinationTab/generics/sendEditModal";
import { goBackModal } from "@config/goBackModal";
import { IUseModalEditDestination } from "@ptypes/hooks/moneyDestination/IUseModalEditDestination";

const useModalEditDestination = (props: IUseModalEditDestination) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showEditedModal,
    handleToggleEditedModal,
    handleEditedModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision = showEditedModal || showGoBackModal || hasError;
    setShowDecision(decision);
  }, [showEditedModal, showGoBackModal, hasError]);

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
      moreDetails: "",
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
            EMoneyDestination.OPTION_NAME,
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

    if (showEditedModal) {
      return {
        ...sendEditedModal,
        onCloseModal: handleToggleEditedModal,
        onClick: handleEditedModal,
        withCancelButton: true,
        loading: loading,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalEditDestination };
