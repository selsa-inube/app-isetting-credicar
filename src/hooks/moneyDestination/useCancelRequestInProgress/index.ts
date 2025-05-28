import { useEffect, useState } from "react";
import { IFlagAppearance, useFlag } from "@inubekit/inubekit";

import { ICancelReqInProcRequest } from "@ptypes/requestInProgress/ICancelReqInProcRequest";
import { cancelRequestInProgMessage } from "@config/moneyDestination/moneyDestinationTab/generics/cancelRequestInProgMessage";
import { cancelRequestInProgress } from "@services/requestInProgress/cancelRequestInProgress";
import { eventBus } from "@events/eventBus";
import { IEntry } from "@ptypes/design/table/IEntry";

const useCancelRequestInProgress = (
  businessUnit: string,
  data: IEntry,
  userAccount: string,
  setEntryCanceled: (id: string | number) => void,
) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { addFlag } = useFlag();

  const fetchCancelRequestData = async (data: ICancelReqInProcRequest) => {
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
      removalJustification: `La cancelación de la solicitud  es requerida por ${userAccount}`,
      requestNumber: data.requestNumber,
      settingRequestId: data.settingRequestId,
    });
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  return {
    showModal,
    loading,
    hasError,
    handleToggleModal,
    handleClick,
  };
};
export { useCancelRequestInProgress };
