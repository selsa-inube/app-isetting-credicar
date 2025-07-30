import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { cancelRequestInProgMessage } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgMessage";
import { cancelLabels } from "@config/generalCreditPolicies/requestsInProgressTab/cancelLabels";
import { IUseCancelRequestInProgress } from "@ptypes/generalCredPolicies/IUseCancelRequestInProgress";
import { ICancelRequestInProgressRequest } from "@ptypes/requestInProgress/ICancelReqInProcRequest";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const { businessUnit, data, userAccount, useCaseCancel, setEntryCanceled } =
    props;
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { addFlag } = useFlag();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseCancel });

  const fetchCancelRequestData = async (
    data: ICancelRequestInProgressRequest,
  ) => {
    setLoading(true);
    try {
      await cancelRequestInProgress(businessUnit, data);
      setEntryCanceled(data.settingRequestId);
      addFlag({
        title: cancelRequestInProgMessage.success.title,
        description: cancelRequestInProgMessage.success.description,
        appearance: cancelRequestInProgMessage.success
          .appearance as IFlagAppearance,
        duration: cancelRequestInProgMessage.success.duration,
      });
    } catch (error) {
      console.info(error);
      setHasError(true);
      addFlag({
        title: cancelRequestInProgMessage.error.title,
        description: cancelRequestInProgMessage.error.description,
        appearance: cancelRequestInProgMessage.error
          .appearance as IFlagAppearance,
        duration: cancelRequestInProgMessage.error.duration,
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

  const handleToggleModal = () => {
    if (disabledButton) {
      setShowInfoModal(!showInfoModal);
    } else {
      setShowModal(!showModal);
    }
  };

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  return {
    showModal,
    loading,
    hasError,
    showInfoModal,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
