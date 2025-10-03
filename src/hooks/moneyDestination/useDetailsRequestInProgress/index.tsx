import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { postAddMoneyDestination } from "@services/moneyDestination/postAddMoneyDestination";
import { deleteMoneyDestination } from "@services/moneyDestination/deleteMoneyDestination";
import { patchEditMoneyDestination } from "@services/moneyDestination/patchEditMoneyDestination";
import { useRequestDetails } from "@hooks/useRequestDetails";
import { eventBus } from "@events/eventBus";
import { errorObject } from "@utils/errorObject";
import { formatDateTable } from "@utils/date/formatDateTable";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { EModalState } from "@enum/modalState";
import { EMoneyDestination } from "@enum/moneyDestination";
import { EComponentAppearance } from "@enum/appearances";
import { detailsRequestInProgressModal } from "@config/moneyDestination/requestsInProgressTab/details/detailsRequestInProgressModal";
import { errorModal } from "@config/errorModal";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";
import { IRequestMoneyDestination } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IRequestMoneyDestination";

const useDetailsRequestInProgress = (data: IEntry) => {
  const { appData } = useContext(AuthAndPortalData);
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const navigate = useNavigate();

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

  const requestConfiguration = {
    ...data?.configurationRequestData,
    settingRequest: {
      requestNumber: data?.requestNumber,
      settingRequestId: data?.settingRequestId,
    },
  };

  const fetchRequestData = async () => {
    setLoading(true);
    try {
      if (data.useCaseName === EMoneyDestination.ADD_MONEY_DESTINATION) {
        await postAddMoneyDestination(
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestMoneyDestination,
        );
        setShowModal(false);
        navigate(-1);
      }
      if (data.useCaseName === EMoneyDestination.MODIFY_MONEY_DESTINATION) {
        await patchEditMoneyDestination(
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestMoneyDestination,
        );
        setShowModal(false);
        navigate(-1);
      }
      if (data.useCaseName === EMoneyDestination.DELETE_MONEY_DESTINATION) {
        await deleteMoneyDestination(
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestMoneyDestination,
        );
        setShowModal(false);
        navigate(-1);
      }
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    normalizeData.request
  }`;

  const withErrorRequest = approvalRequest || executeRequest;

  return {
    showModal,
    normalizeData,
    filteredRequestTabs,
    showTrazabilityData,
    showErrorData,
    errorData,
    hasError,
    loading,
    isSelected,
    defaultSelectedTab,
    withErrorRequest,
    title,
    modalData,
    showDecision,
    handleTabRequestChange,
    statusRequestData,
    handleToggleModal,
  };
};

export { useDetailsRequestInProgress };
