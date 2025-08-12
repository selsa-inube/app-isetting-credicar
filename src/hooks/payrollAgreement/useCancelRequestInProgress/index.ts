import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EModalState } from "@enum/modalState";
import { cancelPayrollLabels } from "@config/payrollAgreement/requestsInProgressTab/cancelPayrollLabels";
import { cancelRequestInProgressMessage } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressMessage";
import { IUseCancelRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseCancelRequestInProgress";
import { ICancelReqInProcRequest } from "@ptypes/payrollAgreement/requestInProgTab/ICancelReqInProcRequest";

const useCancelRequestInProgress = (props: IUseCancelRequestInProgress) => {
  const { businessUnit, data, userAccount, useCaseCancel, setEntryCanceled } =
    props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const { addFlag } = useFlag();

  const { disabledButton } = useValidateUseCase({ useCase: useCaseCancel });

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

  const fetchCancelRequestData = async (data: ICancelReqInProcRequest) => {
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
      removalJustification: `${cancelPayrollLabels.removalJustification} ${userAccount}`,
      requestNumber: data.requestNumber,
      settingRequestId: data.settingRequestId,
    });
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
