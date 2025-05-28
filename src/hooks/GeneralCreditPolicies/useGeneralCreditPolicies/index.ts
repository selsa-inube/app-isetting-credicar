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

  const [isSelected, setIsSelected] = useState<string>(
    generalPoliciesTabsConfig.generalPolicies.id,
  );

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

  const smallScreen = useMediaQuery("(max-width: 990px)");
  const smallScreenTab = useMediaQuery("(max-width: 450px)");

  const showPoliciesTab =
    isSelected === generalPoliciesTabsConfig.generalPolicies.id;

  const policiesTabs = Object.values(generalPoliciesTabsConfig);

  const showAddPolicies = withoutPoliciesData && showModal;

  return {
    withoutPolicies,
    isSelected,
    descriptionOptions,
    smallScreen,
    smallScreenTab,
    showPoliciesTab,
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
