import { useEffect, useState } from "react";
import { EComponentAppearance } from "@enum/appearances";
import { EMoneyDestination } from "@enum/moneyDestination";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorEvaluateRule } from "@utils/messageErrorRule";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { sendEditedModal } from "@config/moneyDestination/moneyDestinationTab/generics/sendEditModal";
import { goBackModal } from "@config/goBackModal";
import { IUseModalEditDestination } from "@ptypes/hooks/moneyDestination/IUseModalEditDestination";
import { getDescriptionError } from "@utils/getDescriptionError";

const useModalEditDestination = (props: IUseModalEditDestination) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showEditedModal,
    hasErrorRule,
    descriptionError,
    handleToggleEditedModal,
    handleEditedModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleErrorRuleModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision =
      showEditedModal ||
      showGoBackModal ||
      hasError ||
      (hasErrorRule !== undefined && hasErrorRule);
    setShowDecision(decision);
  }, [showEditedModal, showGoBackModal, hasError, hasErrorRule]);

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
      loading: false,
      moreDetails: "",
      withIcon: false,
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
            operationTypes.editError,
            EMoneyDestination.OPTION_NAME,
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

    if (hasErrorRule) {
      return {
        ...errorModal(
          messageErrorEvaluateRule(
            descriptionError.status,
            getDescriptionError(descriptionError.response),
          ),
        ),
        onCloseModal: handleToggleErrorRuleModal,
        onClick: handleToggleErrorRuleModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showGoBackModal && !errorFetchRequest && !hasError) {
      return {
        ...goBackModal,
        onCloseModal: handleCloseGoBackModal,
        onClick: handleGoBack,
        withCancelButton: true,
        withIcon: false,
        moreDetails: "",
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showEditedModal) {
      return {
        ...sendEditedModal,
        onCloseModal: handleToggleEditedModal,
        onClick: handleEditedModal,
        withCancelButton: true,
        loading: loading,
        withIcon: false,
        moreDetails: "",
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalEditDestination };
