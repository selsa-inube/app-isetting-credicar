import { useEffect, useState } from "react";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { getDescriptionError } from "@utils/getDescriptionError";
import { disabledModal } from "@config/disabledModal";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { deleteCreditModal } from "@config/creditLines/creditLinesTab/generic/deleteCreditModal";
import { IUseModalDeleteCredit } from "@ptypes/hooks/creditLines/IUseModalDeleteCredit";

const useModalDeleteCreditLine = (props: IUseModalDeleteCredit) => {
  const {
    loading,
    showInfoModal,
    hasError,
    showModal,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
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
      moreDetails: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      loading: false,
      withCancelButton: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && !errorFetchRequest && hasError) {
      return {
        ...errorModal(
          messageErrorStatusRequest(
            errorData.status,
            getDescriptionError(errorData.response),
          ),
        ),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (errorFetchRequest && hasError) {
      return {
        ...errorModal(
          messageErrorUseCases(
            networkError.status,
            operationTypes.deleteError,
            ECreditLines.OPTION_NAME,
            getDescriptionError(errorData.response),
          ),
        ),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        moreDetails: "",
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showModal) {
      return {
        ...deleteCreditModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
        moreDetails: "",
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

export { useModalDeleteCreditLine };
