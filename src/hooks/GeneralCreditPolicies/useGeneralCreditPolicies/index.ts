import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { generalPoliciesTabsConfig } from "@config/generalCreditPolicies/tabs";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { decrypt } from "@utils/crypto/decrypt";
import { useValidateRules } from "../useValidateRules";

const useGeneralCreditPolicies = () => {
  const { businessUnitSigla } = useContext(AuthAndPortalData);

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

  const { descriptionOptions } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
    optionName: "Políticas generales de crédito",
  });

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const showPoliciesTab = isSelected === tabs.generalPolicies.id;

  const showrequestTab = isSelected === tabs.requestsInProgress.id;

  const policiesTabs = Object.values(tabs);

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
