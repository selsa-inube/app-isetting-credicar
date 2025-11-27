import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { deletePayrollAgreement } from "@services/payrollAgreement/deletePayrollAgre";
import { postAddPayrollAgreement } from "@services/payrollAgreement/postAddPayrollAgreement";
import { pacthEditPayrollAgreement } from "@services/payrollAgreement/pacthEditPayrollAgre";
import { useRequestDetails } from "@hooks/useRequestDetails";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { errorObject } from "@utils/errorObject";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { errorModal } from "@config/errorModal";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { IUseDetailsRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseDetailsRequestInProgress";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";
import { IErrors } from "@ptypes/IErrors";
import { useDataDetailsRequest } from "../useDataDetailsRequest";

const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showMoreDetailsModal, setShowMoreDetailsModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const { normalizeData } = useDataDetailsRequest({ data });

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  const screenTablet = useMediaQuery(mediaQueryTablet);
  const isMobile = useMediaQuery(mediaQueryMobile);

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
      if (data.useCaseName === EPayrollAgreement.USE_CASE_ADD) {
        await postAddPayrollAgreement(
          appData.user.userAccount,
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestPayrollAgre,
        );
        setShowModal(false);
        navigate("/payroll-agreement");
      }
      if (data.useCaseName === EPayrollAgreement.USE_CASE_EDIT) {
        await pacthEditPayrollAgreement(
          appData.user.userAccount,
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestPayrollAgre,
        );
        setShowModal(false);
        navigate("/payroll-agreement");
      }
      if (data.useCaseName === EPayrollAgreement.USE_CASE_DELETE) {
        await deletePayrollAgreement(
          appData.user.userAccount,
          appData.businessUnit.publicCode,
          requestConfiguration as IRequestPayrollAgre,
        );
        setShowModal(false);
        navigate("/payroll-agreement");
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

  const onMoreDetails = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

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

  const title = `${detailsRequestInProgressModal.labelRequest} ${data.useCaseName}`;

  const withErrorRequest = approvalRequest || executeRequest;

  const useCaseName = data.useCaseName;
  const normalizeDetails = {
    id: data.settingRequestId,
    settingRequestId: data.settingRequestId,
    configurationRequestData: data.configurationRequestData,
  };

  return {
    showModal,
    screenTablet,
    isMobile,
    showTrazabilityData,
    isSelected,
    filteredRequestTabs,
    showErrorData,
    defaultSelectedTab,
    loading,
    errorData,
    hasError,
    modalData,
    showDecision,
    title,
    statusRequestData,
    withErrorRequest,
    showMoreDetailsModal,
    useCaseName,
    normalizeDetails,
    onMoreDetails,
    handleTabRequestChange,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
