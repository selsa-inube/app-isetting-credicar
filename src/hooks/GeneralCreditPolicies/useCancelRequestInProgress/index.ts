import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { cancelRequestInProgressMessage } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressMessage";
import { cancelRequestInProgressModal } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { cannotCancelledModal } from "@config/generalCreditPolicies/generic/cannotCancelledModal";
import { notCancelStatus } from "@config/status/notCancelStatus";
import { cancelLabels } from "@config/generalCreditPolicies/requestsInProgressTab/cancelLabels";
import { disabledModal } from "@config/disabledModal";
import { IUseCancelRequestInProgress } from "@ptypes/generalCredPolicies/IUseCancelRequestInProgress";
import { ICancelRequestInProgressRequest } from "@ptypes/requestInProgress/ICancelReqInProgressRequest";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const { businessUnit, data, userAccount, useCaseCancel, setEntryCanceled } =
    props;
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [cannotCancelled, setCannotCancelled] = useState(false);
  const { addFlag } = useFlag();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseCancel });

  const notCancel = notCancelStatus.includes(data.requestStatus);

  const handleToggleModal = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    }
    if (!disabledButton) {
      if (notCancel) {
        setCannotCancelled(true);
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

  useEffect(() => {
    const decision = showInfoModal || showModal || cannotCancelled;
    setShowDecision(decision);
  }, [showInfoModal, showModal, cannotCancelled]);

  const fetchCancelRequestData = async (
    data: ICancelRequestInProgressRequest,
  ) => {
    setLoading(true);
    try {
      await cancelRequestInProgress(businessUnit, data);
      setEntryCanceled(data.settingRequestId);
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
      addFlag({
        title: cancelRequestInProgressMessage.error.title,
        description: cancelRequestInProgressMessage.error.description,
        appearance: cancelRequestInProgressMessage.error
          .appearance as IFlagAppearance,
        duration: cancelRequestInProgressMessage.error.duration,
      });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleClick = () => {
    fetchCancelRequestData({
      removalJustification: `${cancelLabels.removalJustification} ${userAccount}`,
      requestNumber: data.requestNumber,
      settingRequestId: data.settingRequestId,
    });
  };

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

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
        ...cancelRequestInProgressModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
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
    showDecision,
    modalData,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
