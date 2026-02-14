import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { useValidateRules } from "@hooks/GeneralCreditPolicies/useValidateRules";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { mediaQueryMobileSmall, mediaQueryTablet } from "@config/environment";
import { generalPoliciesTabsConfig } from "@config/generalCreditPolicies/tabs";
import { IGeneralPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IGeneralPoliciesTabsConfig";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

const useGeneralCreditPolicies = () => {
  const { businessUnitSigla, appData } = useContext(AuthAndPortalData);

  const {
    contributionsData,
    incomeData,
    minimumIncomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
    withoutPolicies,
    loadingPolicies,
  } = useValidateRules();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [showAddPolicies, setShowAddPolicies] = useState<boolean>(false);
  const smallScreen = useMediaQuery(mediaQueryTablet);
  const smallScreenTab = useMediaQuery(mediaQueryMobileSmall);

  const tabs = generalPoliciesTabsConfig(smallScreen);

  const navigate = useNavigate();

  const { disabledButton: withoutPrivilegesAdd } = useValidateUseCase({
    useCase: EGeneralPolicies.USE_CASE_ADD,
  });

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      setLoadingRequest(true);
      try {
        if (appData.businessManager.publicCode.length > 0) {
          const data = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            EGeneralPolicies.ENTITY,
            appData.token,
          );
          setRequestsInProgress(data);
        }
      } catch (error) {
        console.info(error);
      } finally {
        setLoadingRequest(false);
      }
    };

    fetchRequestsInProgressData();
  }, [appData.businessManager.publicCode, appData.businessUnit.publicCode]);

  const withoutRequestsData =
    !loadingRequest && requestsInProgress.length === 0;

  useEffect(() => {
    const validatePolicies =
      !loadingPolicies && withoutRequestsData && withoutPolicies !== undefined;

    if (validatePolicies) {
      setShowModal(!showModal);
    }

    setShowAddPolicies(validatePolicies && withoutPolicies);
  }, [loadingPolicies, withoutPolicies, requestsInProgress]);

  const filteredTabsConfig = useMemo(() => {
    return Object.keys(tabs).reduce((tabOption, key) => {
      const tab = tabs[key as keyof typeof tabs];

      if (key === tabs.generalPolicies.id && withoutPolicies) {
        return tabOption;
      }

      if (key === tabs.requestsInProgress.id && withoutRequestsData) {
        return tabOption;
      }

      if (tab !== undefined) {
        tabOption[key as keyof IGeneralPoliciesTabsConfig] = tab;
      }

      return tabOption;
    }, {} as IGeneralPoliciesTabsConfig);
  }, [tabs, showAddPolicies, withoutRequestsData]);

  const policiesTabs = Object.values(filteredTabsConfig);

  const getFirstFilteredTab = (
    filteredTabsConfig: IGeneralPoliciesTabsConfig,
  ) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IGeneralPoliciesTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredTabsConfig)?.id;

  const [isSelected, setIsSelected] = useState<string>(
    defaultSelectedTab ?? "",
  );

  useEffect(() => {
    setIsSelected(defaultSelectedTab ?? "");
  }, [defaultSelectedTab]);

  const handlePolicies = () => {
    setShowModal(false);
    navigate("/general-credit-policies/add-general-credit-policies");
  };

  const handleEmptyData = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId: appData.portal.publicCode,
    optionName: EGeneralPolicies.OPTION_NAME,
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const emptyData = Boolean(
    !loadingPolicies &&
      !withoutPrivilegesAdd &&
      !showAddPolicies &&
      defaultSelectedTab === undefined,
  );

  const showPoliciesTab =
    !withoutPolicies && isSelected === tabs.generalPolicies.id;

  const showrequestTab = isSelected === tabs.requestsInProgress.id;

  return {
    withoutPolicies,
    isSelected,
    descriptionOptions,
    smallScreen,
    smallScreenTab,
    showPoliciesTab,
    showrequestTab,
    policiesTabs,
    contributionsData,
    minimumIncomeData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
    loadingPolicies,
    showAddPolicies,
    emptyData,
    loadingRequest,
    withoutPrivilegesAdd,
    showModal,
    defaultSelectedTab,
    handleEmptyData,
    handleCloseModal,
    handlePolicies,
    handleTabChange,
  };
};

export { useGeneralCreditPolicies };
