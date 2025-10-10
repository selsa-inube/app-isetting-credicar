import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { notCancelStatus } from "@config/status/notCancelStatus";
import { disabledModal } from "@config/disabledModal";
import { cancelLabels } from "@config/creditLines/requestInProgressTab/cancelLabels";
import { cancelRequestModal } from "@config/creditLines/requestInProgressTab/cancelRequestModal";
import { deleteCreditModal } from "@config/creditLines/creditLinesTab/generic/deleteCreditModal";
import { cancelRequestInProgressMessage } from "@config/creditLines/requestInProgressTab/cancelRequestInProgressMessage";
import { cannotCancelledModal } from "@config/cannotCancelledModal";
import { errorModal } from "@config/errorModal";
import { ICancelRequest } from "@ptypes/creditLines/ICancelRequest";
import { IUseCancelRequestInProgress } from "@ptypes/hooks/creditLines/IUseCancelRequestInProgress";
import { IErrors } from "@ptypes/IErrors";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const {
    businessUnit,
    data,
    userAccount,
    useCaseCancel,
    setEntryCanceled,
    inConstruction = false,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
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

  const fetchCancelRequestData = async (data: ICancelRequest) => {
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
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
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
      Icon: <></>,
      withIcon: false,
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
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (!inConstruction && showModal) {
      return {
        ...cancelRequestModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
        withIcon: false,
        appearance: EComponentAppearance.DANGER,
        appearanceButton: EComponentAppearance.DANGER,
      };
    }

    if (inConstruction && showModal) {
      return {
        ...deleteCreditModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        withCancelButton: true,
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
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
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
    errorData,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
