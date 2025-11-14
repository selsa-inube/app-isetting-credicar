import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { mediaQueryMobileSmall, mediaQueryTablet } from "@config/environment";
import { generalPoliciesTabsConfig } from "@config/generalCreditPolicies/tabs";
import { notPoliciesModal } from "@config/generalCreditPolicies/assisted/goBackModal";
import { disabledModal } from "@config/disabledModal";
import { IGeneralPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IGeneralPoliciesTabsConfig";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { useValidateRules } from "../useValidateRules";

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
    withoutPolicies,
    loadingPolicies,
  } = useValidateRules();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [withoutPoliciesData, setWithoutPoliciesData] =
    useState<boolean>(false);
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
      setWithoutPoliciesData(withoutPolicies);
    }
  }, [loadingPolicies, withoutPolicies, requestsInProgress]);

  useEffect(() => {
    if (withoutPoliciesData) {
      setShowModal(!showModal);
    }
    setShowAddPolicies(withoutPolicies !== undefined && withoutPolicies);
  }, [withoutPoliciesData]);

  const filteredTabsConfig = useMemo(() => {
    return Object.keys(tabs).reduce((tabOption, key) => {
      const tab = tabs[key as keyof typeof tabs];

      if (key === tabs.generalPolicies.id && !showAddPolicies) {
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
    defaultSelectedTab ?? tabs.requestsInProgress.id,
  );

  const handlePolicies = () => {
    setShowModal(false);
    navigate("/general-credit-policies/add-general-credit-policies");
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

  const modalData =
    withoutPrivilegesAdd && showAddPolicies
      ? {
          ...disabledModal,
          withCancelButton: false,
          onCloseModal: handleCloseModal,
          onClick: handleCloseModal,
        }
      : {
          ...notPoliciesModal,
          withCancelButton: true,
          onCloseModal: handleCloseModal,
          onClick: handlePolicies,
        };

  const showPoliciesTab = isSelected === tabs.generalPolicies.id;

  const showrequestTab = isSelected === tabs.requestsInProgress.id;

  return {
    withoutPolicies,
    withoutPoliciesData,
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
    loadingPolicies,
    showAddPolicies,
    modalData,
    loadingRequest,
    handleTabChange,
  };
};

export { useGeneralCreditPolicies };
