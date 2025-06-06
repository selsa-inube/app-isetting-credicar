import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormikProps } from "formik";
import { IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";

import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDate } from "@utils/date/formatDate";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { editGeneralPoliciesTabsConfig } from "@config/generalCreditPolicies/editGeneralPolicies/tabs";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { IUseEditGenCredPolicies } from "@ptypes/hooks/IUseEditGenCredPolicies";
import { IEditPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IEditPoliciesTabsConfig";
import { hasValuesRule } from "@utils/hasValuesRule";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { factor } from "@config/generalCreditPolicies/editGeneralPolicies/factor";
import { calculation } from "@config/generalCreditPolicies/editGeneralPolicies/calculation";
import { reciprocity } from "@config/generalCreditPolicies/editGeneralPolicies/reciprocity";
import { allConditionsRules } from "@utils/allConditionsRules";
import { referencePolicies } from "@config/generalCreditPolicies/editGeneralPolicies/reference";
import { dataTranslations } from "@utils/dataTranslations";
import { useNewDecisions } from "../useNewDecisions";

const useEditGenCredPolicies = (props: IUseEditGenCredPolicies) => {
  const {
    contributionsData,
    incomeData,
    scoreModelsData,
    referenceData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
  } = props;
  const { appData } = useContext(AuthAndPortalData);

  const initialMethodsData = () => {
    const hasReciprocity = allConditionsRules(methodsData).some((condition) =>
      reciprocity.includes(condition.conditionName),
    );

    const hasCalculation = allConditionsRules(methodsData).some((condition) =>
      calculation.includes(condition.conditionName),
    );
    const hasFactor = allConditionsRules(methodsData).some((condition) =>
      factor.includes(condition.conditionName),
    );
    return { hasReciprocity, hasCalculation, hasFactor };
  };

  const { hasReciprocity, hasCalculation, hasFactor } = initialMethodsData();

  const hasReference = allConditionsRules(referenceData).find((condition) =>
    referencePolicies.includes(condition.conditionName),
  )?.conditionName;

  const initialDecisionsGenData = {
    reference: hasReference ? dataTranslations[hasReference] : "",
    additionalDebtors: hasValuesRule(additionalDebtorsData),
    sourcesIncome: hasValuesRule(sourcesIncomeData),
    financialObligations: hasValuesRule(financialObligData),
    realGuarantees: hasValuesRule(realGuaranteesData),
    calculation: hasCalculation,
    reciprocity: hasReciprocity,
    factor: hasFactor,
  };

  const [formValues, setFormValues] = useState<IDecisionsGeneralEntry>(
    initialDecisionsGenData,
  );

  const [saveData, setSaveData] = useState<ISaveDataRequest>();

  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isSelected, setIsSelected] = useState<string>(
    () => editGeneralPoliciesTabsConfig.decisionsGeneral.id,
  );
  const decisionsGeneralRef = useRef<FormikProps<IDecisionsGeneralEntry>>(null);

  const navigate = useNavigate();

  const normalizedContributions = normalizeEvaluateRuleData(contributionsData);
  const normalizedIncome = normalizeEvaluateRuleData(incomeData);
  const normalizedScoreModels = normalizeEvaluateRuleData(
    scoreModelsData,
    "BusinessUnit",
  );

  const prevContributionsRef = useRef<IRuleDecision[]>([]);
  prevContributionsRef.current = normalizedContributions ?? [];

  const prevIncomesRef = useRef<IRuleDecision[]>([]);
  prevIncomesRef.current = normalizedIncome ?? [];

  const prevScoreModelsRef = useRef<IRuleDecision[]>([]);
  prevScoreModelsRef.current = normalizedScoreModels ?? [];

  const {
    showRequestProcessModal,
    contributionsPortfolio,
    showModal,
    isCurrentFormValid,
    incomePortfolio,
    scoreModels,
    dateDecisions,
    newDecisions,
    showReciprocity,
    showFactor,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
    setShowModal,
  } = useNewDecisions({
    contributionsData,
    incomeData,
    scoreModelsData,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
  });

  const filteredTabs = useMemo(() => {
    return Object.keys(editGeneralPoliciesTabsConfig).reduce((acc, key) => {
      const tab =
        editGeneralPoliciesTabsConfig[
          key as keyof typeof editGeneralPoliciesTabsConfig
        ];

      if (
        key === editGeneralPoliciesTabsConfig.contributionsPortfolio.id &&
        !showReciprocity
      ) {
        return acc;
      }

      if (
        key === editGeneralPoliciesTabsConfig.incomePortfolio.id &&
        !showFactor
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IEditPoliciesTabsConfig] = tab;
      }
      return acc;
    }, {} as IEditPoliciesTabsConfig);
  }, [showReciprocity, showFactor]);

  const handleTabChange = (tabId: string) => {
    if (decisionsGeneralRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...decisionsGeneralRef.current?.values,
      }));
    }
    setIsSelected(tabId);
  };

  useEffect(() => {
    if (decisionsGeneralRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...decisionsGeneralRef.current?.values,
      }));
    }
  }, [decisionsGeneralRef.current?.values]);

  const handleToggleDateModal = () => {
    setShowDateModal(!showDateModal);
  };

  const handleFinishForm = () => {
    const configurationRequestData: {
      moneyDestinationId: string;
      modifyJustification: string;
      abbreviatedName?: string;
      descriptionUse?: string;
      iconReference?: string;
      rules?: IRuleDecision[];
    } = {
      moneyDestinationId: "",
      modifyJustification: `La modificación del destino de dinero es solicitada por ${appData.user.userAccount}`,
    };

    if (newDecisions && newDecisions.length > 0) {
      configurationRequestData.rules = newDecisions;
    }

    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description:
        "Solicitud de modificación de politicas generales de crédito",
      entityName: "GeneralCreditPolicies",
      requestDate: formatDate(new Date()),
      useCaseName: "ModifyGeneralCreditPolicies",
      configurationRequestData,
    });
    setShowRequestProcessModal(true);
  };

  const handleReset = () => {
    setShowGoBackModal(true);
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const smallScreen = useMediaQuery("(max-width: 990px)");
  const tabletScreen = useMediaQuery("(max-width: 1530px)");

  const showDecisionsGeneral =
    filteredTabs.decisionsGeneral &&
    isSelected === filteredTabs.decisionsGeneral.id;

  const showContributions =
    filteredTabs.contributionsPortfolio &&
    isSelected === filteredTabs.contributionsPortfolio.id;

  const showIncomePort =
    filteredTabs.incomePortfolio &&
    isSelected === filteredTabs.incomePortfolio.id;

  const showScoreModels =
    filteredTabs.scoreModels && isSelected === filteredTabs.scoreModels.id;

  const heightContPageContribut =
    contributionsPortfolio.length === 0 ? "58vh" : "auto";
  const heightContPageIncome = incomePortfolio.length === 0 ? "58vh" : "auto";
  const heightContPageScoreModels = scoreModels.length === 0 ? "58vh" : "auto";

  return {
    formValues,
    initialDecisionsGenData,
    decisionsGeneralRef,
    isSelected,
    saveData,
    showRequestProcessModal,
    smallScreen,
    contributionsPortfolio,
    showModal,
    isCurrentFormValid,
    incomePortfolio,
    scoreModels,
    filteredTabs,
    tabletScreen,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
    showDateModal,
    dateDecisions,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    heightContPageContribut,
    heightContPageIncome,
    heightContPageScoreModels,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    handleFinishForm,
    handleToggleDateModal,
    handleGoBack,
    handleCloseGoBackModal,
    normalizeEvaluateRuleData,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    handleReset,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  };
};

export { useEditGenCredPolicies };
