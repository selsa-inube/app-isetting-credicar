import { MdOutlineWarningAmber } from "react-icons/md";
import { useEffect, useState } from "react";
import { messageErrorUseCases } from "@utils/messageErrorUseCases";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { getDescriptionError } from "@utils/getDescriptionError";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { EComponentAppearance } from "@enum/appearances";
import { errorModal } from "@config/errorModal";
import { operationTypes } from "@config/useCase";
import { goBackModal } from "@config/goBackModal";
import { sendEditedModal } from "@config/payrollAgreement/payrollAgreementTab/generic/sendEditModal";
import { deletedAlertModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deletedAlertModal";
import { IUseModalEditPayroll } from "@ptypes/hooks/payrollAgreement/IUseModalEditPayroll";

const useModalEditPayroll = (props: IUseModalEditPayroll) => {
  const {
    showGoBackModal,
    loading,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showEditedModal,
    loadingSendData,
    showDeletedAlertModal,
    typePayroll,
    handleToggleDeletedAlertModal,
    handleToggleEditedModal,
    handleEditedModal,
    handleCloseGoBackModal,
    handleGoBack,
    handleToggleErrorModal,
  } = props;

  const [showDecision, setShowDecision] = useState(false);
  useEffect(() => {
    const decision =
      showEditedModal || showDeletedAlertModal || showGoBackModal || hasError;
    setShowDecision(decision);
  }, [showEditedModal, showDeletedAlertModal, showGoBackModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      moreDetails: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      loading: false,
      withIcon: false,
      icon: <></>,
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
            EPayrollAgreement.OPTION_NAME,
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

    if (showGoBackModal && !errorFetchRequest && !hasError) {
      return {
        ...goBackModal,
        onCloseModal: handleCloseGoBackModal,
        onClick: handleGoBack,
        moreDetails: "",
        withCancelButton: true,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showEditedModal) {
      return {
        ...sendEditedModal,
        onCloseModal: handleToggleEditedModal,
        onClick: handleEditedModal,
        moreDetails: "",
        withCancelButton: true,
        loading: loadingSendData,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showDeletedAlertModal) {
      return {
        ...deletedAlertModal(typePayroll),
        onCloseModal: handleToggleDeletedAlertModal,
        onClick: handleToggleDeletedAlertModal,
        withCancelButton: false,
        withIcon: true,
        moreDetails: "",
        icon: <MdOutlineWarningAmber />,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return { modalData, showDecision };
};

export { useModalEditPayroll };
