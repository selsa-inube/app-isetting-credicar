import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { useRequestDetails } from "@hooks/useRequestDetails";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { RequestType } from "@enum/requestType";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { formatDateTable } from "@utils/date/formatDateTable";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { detailsRequestInProgressModal } from "@config/creditLines/requestInProgressTab/detailsRequestInProgressModal";
import { errorModal } from "@config/errorModal";
import { IUseDetailsRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseDetailsRequestInProgress";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";

const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeData = {
    ...data,
    request: data.useCaseName,
    responsable: "",
    status: data.requestStatus,
    traceability: data.configurationRequestsTraceability.map(
      (traceability: IEntry) => ({
        dateExecution: formatDateTable(new Date(traceability.executionDate)),
        actionExecuted: traceability.actionExecuted,
        userWhoExecuted: traceability.userWhoExecutedAction,
        description: traceability.description,
      }),
    ),
  };

  const fetchRequestData = async () => {
    return Promise.resolve();
  };

  const {
    approvalRequest,
    defaultSelectedTab,
    executeRequest,
    filteredRequestTabs,
    isSelected,
    showErrorData,
    showTrazabilityData,
    statusRequestData,
    handleTabRequestChange,
    handleToggleErrorModal,
  } = useRequestDetails({
    hasError,
    data,
    setShowModal,
    fetchRequestData,
    setErrorData,
    setHasError,
    setLoading,
  });

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  const screenTablet = useMediaQuery(mediaQueryTablet);
  const isMobile = useMediaQuery(mediaQueryMobile);

  useEffect(() => {
    const decision = hasError;
    setShowDecision(decision);
  }, [hasError]);

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
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusRequest(errorData.status)),
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

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    RequestType[data.request as keyof typeof RequestType] ?? data.request
  }`;

  const withErrorRequest = approvalRequest || executeRequest;

  return {
    showModal,
    screenTablet,
    isMobile,
    showTrazabilityData,
    isSelected,
    filteredRequestTabs,
    showErrorData,
    defaultSelectedTab,
    withErrorRequest,
    loading,
    errorData,
    hasError,
    modalData,
    showDecision,
    title,
    statusRequestData,
    handleTabRequestChange,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
