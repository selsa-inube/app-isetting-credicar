import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormikProps } from "formik";
import { IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { formatDate } from "@utils/date/formatDate";
import { hasValuesRule } from "@utils/hasValuesRule";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { dataTranslations } from "@utils/dataTranslations";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { factor } from "@config/generalCreditPolicies/editGeneralPolicies/factor";
import { editGeneralPoliciesTabsConfig } from "@config/generalCreditPolicies/editGeneralPolicies/tabs";
import { calculation } from "@config/generalCreditPolicies/editGeneralPolicies/calculation";
import { reciprocity } from "@config/generalCreditPolicies/editGeneralPolicies/reciprocity";
import { referencePolicies } from "@config/generalCreditPolicies/editGeneralPolicies/reference";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/editLabels";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IUseEditGenCredPolicies } from "@ptypes/hooks/IUseEditGenCredPolicies";
import { IEditPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IEditPoliciesTabsConfig";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
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
    const hasReciprocity = methodsData?.some((condition) =>
      reciprocity.includes(condition.value as string),
    );

    const hasCalculation = methodsData?.some((condition) =>
      calculation.includes(condition.value as string),
    );
    const hasFactor = methodsData?.some((condition) =>
      factor.includes(condition.value as string),
    );
    return { hasReciprocity, hasCalculation, hasFactor };
  };

  const { hasReciprocity, hasCalculation, hasFactor } = initialMethodsData();

  const hasReference = referenceData?.find((condition) =>
    referencePolicies.includes(condition.value as string),
  )?.value;

  const initialDecisionsGenData = {
    reference: hasReference ? dataTranslations[hasReference as string] : "",
    additionalDebtors: hasValuesRule(additionalDebtorsData),
    sourcesIncome: hasValuesRule(sourcesIncomeData),
    financialObligations: hasValuesRule(financialObligData),
    realGuarantees: hasValuesRule(realGuaranteesData),
    calculation: hasCalculation ?? false,
    reciprocity: hasReciprocity ?? false,
    factor: hasFactor ?? false,
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
    EGeneralPolicies.CONDITION_BUSINESS_UNIT,
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

  const handleEditedModal = () => {
    handleFinishForm();
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
      modifyJustification: `${editLabels.title} ${appData.user.userAccount}`,
    };

    if (newDecisions && newDecisions.length > 0) {
      configurationRequestData.rules = newDecisions;
    }

    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: editLabels.title,
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

  const smallScreen = useMediaQuery(mediaQueryTablet);

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
    showDateModal,
    isCurrentFormValid,
    incomePortfolio,
    scoreModels,
    filteredTabs,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
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
    handleEditedModal,
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
    setShowDateModal,
  };
};

export { useEditGenCredPolicies };
