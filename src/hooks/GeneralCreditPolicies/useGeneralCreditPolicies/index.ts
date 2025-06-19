import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { generalPoliciesTabsConfig } from "@config/generalCreditPolicies/tabs";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { decrypt } from "@utils/crypto/decrypt";
import { useValidateRules } from "../useValidateRules";
import { IGeneralPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IGeneralPoliciesTabsConfig";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";

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
  const smallScreen = useMediaQuery("(max-width: 990px)");
  const smallScreenTab = useMediaQuery("(max-width: 450px)");

  const tabs = generalPoliciesTabsConfig(smallScreen);

  const [isSelected, setIsSelected] = useState<string>(tabs.generalPolicies.id);

  const navigate = useNavigate();

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
          "GeneralCreditPolicies",
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
    optionName: "Políticas generales de crédito",
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const filteredTabsConfig = Object.keys(tabs).reduce((acc, key) => {
    const tab = tabs[key as keyof typeof tabs];

    if (
      key === tabs.requestsInProgress.id &&
      requestsInProgress &&
      requestsInProgress.length === 0
    ) {
      return acc;
    }

    if (tab !== undefined) {
      acc[key as keyof IGeneralPoliciesTabsConfig] = tab;
    }
    return acc;
  }, {} as IGeneralPoliciesTabsConfig);

  const showPoliciesTab = isSelected === tabs.generalPolicies.id;

  const showrequestTab = isSelected === tabs.requestsInProgress.id;

  const policiesTabs = Object.values(filteredTabsConfig);

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
    handleTabChange,
    handleCloseModal,
    handlePolicies,
  };
};

export { useGeneralCreditPolicies };
