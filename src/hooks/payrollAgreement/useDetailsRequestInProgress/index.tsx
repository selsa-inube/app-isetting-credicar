import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { patchApprovalConfiguration } from "@services/requestInProgress/patchApprovalConfiguration";
import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EComponentAppearance } from "@enum/appearances";
import { RequestType } from "@enum/requestType";
import { errorObject } from "@utils/errorObject";
import { messageErrorStatusRequest } from "@utils/messageErrorStatusRequest";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { detailsRequestTabsConfig } from "@config/detailsRequestTabsConfig";
import { withErrorInRequest } from "@config/status/withErrorInRequest";
import { errorModal } from "@config/errorModal";
import { detailsRequest } from "@config/detailsRequest";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { IUseDetailsRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseDetailsRequestInProgress";
import { IDetailsRequestTabsConfig } from "@ptypes/requestInProgress/IDetailsRequestTabsConfig";
import { IErrors } from "@ptypes/IErrors";
import { useDataDetailsRequest } from "../useDataDetailsRequest";
const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showModal, setShowModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [isSelected, setIsSelected] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const withErrorRequest = withErrorInRequest.includes(data.requestStatusCode);

  const { normalizeData } = useDataDetailsRequest({ data });

  const fetchRequestData = async () => {
    setLoading(true);
    try {
      await patchApprovalConfiguration(appData.user.userAccount, {
        requestNumber: data.requestNumber,
        modifyJustification: `${detailsRequest.modifyJustification} ${appData.user.userAccount}`,
        settingRequestId: data.settingRequestId,
      });
      setShowModal(false);
      navigate("/");
    } catch (error) {
      console.info(error);
      setHasError(true);
      setErrorData(errorObject(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  const filteredRequestTabsConfig = Object.keys(
    detailsRequestTabsConfig,
  ).reduce((detail, key) => {
    const tab =
      detailsRequestTabsConfig[key as keyof IDetailsRequestTabsConfig];

    if (
      tab?.id === detailsRequestTabsConfig.errorData.id &&
      !withErrorRequest
    ) {
      return detail;
    }

    if (tab !== undefined) {
      detail[key as keyof IDetailsRequestTabsConfig] = tab;
    }
    return detail;
  }, {} as IDetailsRequestTabsConfig);

  const handleTabRequestChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const handleApproval = () => {
    fetchRequestData();
  };

  const screenTablet = useMediaQuery(mediaQueryTablet);
  const isMobile = useMediaQuery(mediaQueryMobile);

  const getFirstFilteredTab = (
    filteredTabsConfig: IDetailsRequestTabsConfig,
  ) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsRequestTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredRequestTabsConfig)?.id;

  const handleToggleErrorModal = () => {
    setHasError(!hasError);

    if (hasError) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (defaultSelectedTab === detailsRequestTabsConfig.errorData.id) {
      setIsSelected(detailsRequestTabsConfig.errorData.id);
    } else {
      setIsSelected(detailsRequestTabsConfig.trazabilityData.id);
    }
  }, []);

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

  const filteredRequestTabs = Object.values(filteredRequestTabsConfig);

  const showTrazabilityData =
    isSelected === detailsRequestTabsConfig.trazabilityData.id;

  const showErrorData = isSelected === detailsRequestTabsConfig.errorData.id;

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    RequestType[data.request as keyof typeof RequestType] ?? data.request
  }`;

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
    handleApproval,
    handleTabRequestChange,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
