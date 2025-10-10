import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useRequestDetails } from "@hooks/useRequestDetails";
import { deleteCreditLineTab } from "@services/creditLines/deleteCreditLineTab";
import { patchModifyCreditLine } from "@services/creditLines/patchModifyCreditLine";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { ECreditLines } from "@enum/creditLines";
import { EComponentAppearance } from "@enum/appearances";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { formatDateTable } from "@utils/date/formatDateTable";
import { errorObject } from "@utils/errorObject";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { detailsRequestInProgressModal } from "@config/creditLines/requestInProgressTab/detailsRequestInProgressModal";
import { errorModal } from "@config/errorModal";
import { IUseDetailsRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseDetailsRequestInProgress";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";
import { IRequestCreditLine } from "@ptypes/creditLines/IRequestCreditLine";
import { IModifyCreditLine } from "@ptypes/creditLines/IModifyCreditLine";

const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { appData } = useContext(AuthAndPortalData);
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
      if (data.useCaseName === ECreditLines.USE_CASE_DELETE) {
        await deleteCreditLineTab(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IRequestCreditLine,
        );
        setShowModal(false);
        navigate("/credit-lines");
      }
      if (data.useCaseName === ECreditLines.USE_CASE_EDIT) {
        await patchModifyCreditLine(
          appData.businessUnit.publicCode,
          appData.user.userAccount,
          requestConfiguration as IModifyCreditLine,
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

  const title = `${detailsRequestInProgressModal.labelRequest} ${data.request}`;

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
