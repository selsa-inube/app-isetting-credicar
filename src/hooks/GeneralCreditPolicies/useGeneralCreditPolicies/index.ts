import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { decrypt } from "@utils/crypto/decrypt";
import { mediaQueryMobileSmall, mediaQueryTablet } from "@config/environment";
import { generalPoliciesTabsConfig } from "@config/generalCreditPolicies/tabs";
import { IGeneralPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IGeneralPoliciesTabsConfig";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { useValidateRules } from "../useValidateRules";

const useGeneralCreditPolicies = () => {
  const { businessUnitSigla, appData } = useContext(AuthAndPortalData);

  const {
    referenceData,
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
    withoutPolicies,
    loadingPolicies,
  } = useValidateRules();

  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [withoutPoliciesData, setWithoutPoliciesData] =
    useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const smallScreen = useMediaQuery(mediaQueryTablet);
  const smallScreenTab = useMediaQuery(mediaQueryMobileSmall);

  const tabs = generalPoliciesTabsConfig(smallScreen);

  const navigate = useNavigate();

  const { disabledButton: withoutPrivilegesAdd } = useValidateUseCase({
    useCase: EGeneralPolicies.USE_CASE_ADD,
  });

  useEffect(() => {
    if (withoutPolicies !== undefined) {
      setWithoutPoliciesData(withoutPolicies);
    }
  }, [withoutPolicies]);

  useEffect(() => {
    if (withoutPoliciesData) {
      setShowModal(true);
    }
  }, [withoutPoliciesData]);

  const filteredTabsConfig = Object.keys(tabs).reduce((tabOption, key) => {
    const tab = tabs[key as keyof typeof tabs];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return tabOption;
    }

    if (tab !== undefined) {
      tabOption[key as keyof IGeneralPoliciesTabsConfig] = tab;
    }
    return tabOption;
  }, {} as IGeneralPoliciesTabsConfig);

  const policiesTabs = Object.values(filteredTabsConfig);

  const prueba = policiesTabs[policiesTabs.length - 1].id;

  const [isSelected, setIsSelected] = useState<string>(prueba);

  const handlePolicies = () => {
    setShowModal(false);
    navigate("/general-credit-policies/add-general-credit-policies");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      try {
        const data = await getRequestsInProgress(
          appData.businessUnit.publicCode,
          EGeneralPolicies.ENTITY,
        );
        setRequestsInProgress(data);
      } catch (error) {
        console.info(error);
      }
    };

    fetchRequestsInProgressData();
  }, []);

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: EGeneralPolicies.OPTION_NAME,
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const showPoliciesTab = isSelected === tabs.generalPolicies.id;

  const showrequestTab = isSelected === tabs.requestsInProgress.id;

  const showAddPolicies = withoutPoliciesData && showModal;

  return {
    withoutPolicies,
    isSelected,
    descriptionOptions,
    smallScreen,
    smallScreenTab,
    showPoliciesTab,
    showrequestTab,
    policiesTabs,
    referenceData,
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
    loadingPolicies,
    showAddPolicies,
    withoutPrivilegesAdd,
    handleTabChange,
    handleCloseModal,
    handlePolicies,
  };
};

export { useGeneralCreditPolicies };
