import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { eventBus } from "@events/eventBus";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { getDescriptionError } from "@utils/getDescriptionError";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { disabledModal } from "@config/disabledModal";
import { notCancelStatus } from "@config/status/notCancelStatus";
import { cannotCancelledModal } from "@config/cannotCancelledModal";
import { cancelRequestInProgressModal } from "@config/moneyDestination/moneyDestinationTab/generics/cancelRequestInProgressModal";
import { cancelRequestInProgressMessage } from "@config/moneyDestination/moneyDestinationTab/generics/cancelRequestInProgMessage";
import { errorModal } from "@config/errorModal";
import { cancelLabels } from "@config/generalCreditPolicies/requestsInProgressTab/cancelLabels";
import { ICancelRequestInProgressRequest } from "@ptypes/requestInProgress/ICancelReqInProgressRequest";
import { IUseCancelRequestInProgress } from "@ptypes/generalCredPolicies/IUseCancelRequestInProgress";
import { IErrors } from "@ptypes/IErrors";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const { businessUnit, data, userAccount, useCaseCancel, setEntryCanceled } =
    props;
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [cannotCancelled, setCannotCancelled] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  const { addFlag } = useFlag();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseCancel });

  const notCancel = notCancelStatus.includes(data.requestStatus);

  const handleToggleModal = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    }
    if (!disabledButton) {
      if (notCancel) {
        setCannotCancelled(!cannotCancelled);
      } else {
        setShowModal(!showModal);
      }
    }
  };

  const handleToggleCancelledModal = () => {
    setCannotCancelled(!notCancel);
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const fetchCancelRequestData = async (
    data: ICancelRequestInProgressRequest,
  ) => {
    setLoading(true);
    try {
      await cancelRequestInProgress(businessUnit, data);
      setEntryCanceled(data.settingRequestId);
      setShowModal(false);
      addFlag({
        title: cancelRequestInProgressMessage.success.title,
        description: cancelRequestInProgressMessage.success.description,
        appearance: cancelRequestInProgressMessage.success
          .appearance as IFlagAppearance,
        duration: cancelRequestInProgressMessage.success.duration,
      });
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    setShowModal(false);
  };

  const handleClick = () => {
    fetchCancelRequestData({
      removalJustification: `${cancelLabels.removalJustification} ${userAccount}`,
      requestNumber: data.requestNumber,
      settingRequestId: data.settingRequestId,
    });
  };

  useEffect(() => {
    const decision = showInfoModal || showModal || cannotCancelled || hasError;
    setShowDecision(decision);
  }, [showInfoModal, showModal, cannotCancelled, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      moreDetails: "",
      icon: <></>,
      withIcon: false,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (hasError) {
      return {
        ...errorModal(
          messageErrorStatusConsultation(
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

    if (showInfoModal) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        moreDetails: "",
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (showModal) {
      return {
        ...cancelRequestInProgressModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
        moreDetails: "",
        withIcon: false,
        appearance: EComponentAppearance.DANGER,
        appearanceButton: EComponentAppearance.DANGER,
      };
    }

    if (cannotCancelled) {
      return {
        ...cannotCancelledModal,
        onCloseModal: handleToggleCancelledModal,
        onClick: handleToggleModal,
        withCancelButton: false,
        moreDetails: "",
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  return {
    showModal,
    loading,
    hasError,
    showInfoModal,
    modalData,
    showDecision,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
