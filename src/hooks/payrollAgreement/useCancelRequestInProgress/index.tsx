import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { getDescriptionError } from "@utils/getDescriptionError";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { cancelPayrollLabels } from "@config/payrollAgreement/requestsInProgressTab/cancelPayrollLabels";
import { cancelRequestInProgressMessage } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressMessage";
import { notCancelStatus } from "@config/status/notCancelStatus";
import { cancelRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { errorModal } from "@config/errorModal";
import { cannotCancelledModal } from "@config/cannotCancelledModal";
import { ICancelReqInProcRequest } from "@ptypes/payrollAgreement/requestInProgTab/ICancelReqInProcRequest";
import { IUseCancelRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseCancelRequestInProgress";
import { IErrors } from "@ptypes/IErrors";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const { businessUnit, data, userAccount, token, setEntryCanceled } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [cannotCancelled, setCannotCancelled] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const { addFlag } = useFlag();

  const notCancel = notCancelStatus.includes(data.requestStatusCode);

  const handleToggleModal = () => {
    if (notCancel) {
      setCannotCancelled(!cannotCancelled);
    } else {
      setShowModal(!showModal);
    }
  };

  const handleToggleCancelledModal = () => {
    setCannotCancelled(!notCancel);
  };

  const fetchCancelRequestData = async (data: ICancelReqInProcRequest) => {
    setLoading(true);
    try {
      await cancelRequestInProgress(businessUnit, data, token);
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
      removalJustification: `${cancelPayrollLabels.removalJustification} ${userAccount}`,
      requestNumber: data.requestNumber,
      settingRequestId: data.settingRequestId,
    });
  };

  useEffect(() => {
    const decision = showModal || cannotCancelled || hasError;
    setShowDecision(decision);
  }, [showModal, cannotCancelled, hasError]);

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

    if (showModal) {
      return {
        ...cancelRequestInProgressModal,
        onCloseModal: handleToggleModal,
        onClick: handleClick,
        moreDetails: "",
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
        moreDetails: "",
        withCancelButton: false,
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
    showDecision,
    modalData,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
