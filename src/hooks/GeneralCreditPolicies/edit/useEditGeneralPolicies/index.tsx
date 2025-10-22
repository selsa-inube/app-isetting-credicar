import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormikProps } from "formik";
import { IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { formatDate } from "@utils/date/formatDate";
import { hasValuesRule } from "@utils/hasValuesRule";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { compareObjects } from "@utils/compareObjects";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { factor } from "@config/generalCreditPolicies/editGeneralPolicies/factor";
import { editGeneralPoliciesTabsConfig } from "@config/generalCreditPolicies/editGeneralPolicies/tabs";
import { calculation } from "@config/generalCreditPolicies/editGeneralPolicies/calculation";
import { reciprocity } from "@config/generalCreditPolicies/editGeneralPolicies/reciprocity";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/editLabels";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IEditPoliciesTabsConfig } from "@ptypes/generalCredPolicies/IEditPoliciesTabsConfig";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IUseEditGeneralPolicies } from "@ptypes/hooks/IUseEditGeneralPolicies";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { useNewDecisions } from "../useNewDecisions";

const useEditGeneralPolicies = (props: IUseEditGeneralPolicies) => {
  const {
    contributionsData,
    incomeData,
    scoreModelsData,
    minimumIncomeData,
    methodsData,
    additionalDebtorsData,
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

  const initialDecisionsGenData = {
    additionalDebtors: hasValuesRule(additionalDebtorsData),
    realGuarantees: hasValuesRule(realGuaranteesData),
    PaymentCapacityBasedCreditLimit: hasCalculation ?? false,
    ReciprocityBasedCreditLimit: hasReciprocity ?? false,
    RiskAnalysisBasedCreditLimit: hasFactor ?? false,
  };

  const [formValues, setFormValues] = useState<IDecisionsGeneralEntry>(
    initialDecisionsGenData,
  );

  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>(
    () => editGeneralPoliciesTabsConfig.decisionsGeneral.id,
  );
  const decisionsGeneralRef = useRef<FormikProps<IDecisionsGeneralEntry>>(null);

  const navigate = useNavigate();
  const fixDecisionsByRuleArray = (data: IRuleDecisionExtended[] | undefined) =>
    (data ?? []).map((item) => ({
      ...item,
      decisionsByRule: Array.isArray(item.decisionsByRule)
        ? item.decisionsByRule
        : item.decisionsByRule
          ? [item.decisionsByRule]
          : [],
    }));

  const normalizedContributions = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(contributionsData),
  );
  const normalizedIncome = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(incomeData),
  );
  const normalizedScoreModels = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(
      scoreModelsData,
      EGeneralPolicies.CONDITION_BUSINESS_UNIT,
    ),
  );

  const normalizedMinimumIncome = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(minimumIncomeData),
  );

  const prevContributionsRef = useRef<IRules[]>([]);
  prevContributionsRef.current = normalizedContributions ?? [];

  const prevIncomesRef = useRef<IRules[]>([]);
  prevIncomesRef.current = normalizedIncome ?? [];

  const prevScoreModelsRef = useRef<IRules[]>([]);
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
    minimumIncomePercentage,
    setMinimumIncomePercentage,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  } = useNewDecisions({
    formValues,
    initialGeneralData: initialDecisionsGenData,
    contributionsData,
    incomeData,
    scoreModelsData,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
    user: appData.user.userAccount,
  });

  const { disabledButton: withoutPrivilegesEdit } = useValidateUseCase({
    useCase: EGeneralPolicies.USE_CASE_EDIT,
  });

  useEffect(() => {
    if (withoutPrivilegesEdit) {
      setShowInfoModal(!showInfoModal);
    }
  }, [withoutPrivilegesEdit]);

  const filteredTabs = useMemo(() => {
    return Object.keys(editGeneralPoliciesTabsConfig).reduce((tabs, key) => {
      const tab =
        editGeneralPoliciesTabsConfig[
          key as keyof typeof editGeneralPoliciesTabsConfig
        ];

      if (
        key === editGeneralPoliciesTabsConfig.contributionsPortfolio.id &&
        !showReciprocity
      ) {
        return tabs;
      }

      if (
        key === editGeneralPoliciesTabsConfig.incomePortfolio.id &&
        !showFactor
      ) {
        return tabs;
      }

      if (tab !== undefined) {
        tabs[key as keyof IEditPoliciesTabsConfig] = tab;
      }
      return tabs;
    }, {} as IEditPoliciesTabsConfig);
  }, [showReciprocity, showFactor]);

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
    navigate("/");
  };

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
      useCaseName: EGeneralPolicies.USE_CASE_EDIT,
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
    setCanRefresh(true);
    navigate(-1);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialDecisionsGenData, formValues) ||
        (decisionsGeneralRef.current &&
          !compareObjects(
            decisionsGeneralRef.current.initialValues,
            decisionsGeneralRef.current.values,
          ));

      if (hasUnsavedChanges) {
        event.preventDefault();
        setShowGoBackModal(!showGoBackModal);

        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formValues, initialDecisionsGenData, decisionsGeneralRef, canRefresh]);

  const handleOpenModal = () => {
    const compare = compareObjects(initialDecisionsGenData, formValues);
    const compareGeneral = compareObjects(
      initialDecisionsGenData,
      decisionsGeneralRef.current?.values,
    );
    if (!compare || !compareGeneral) {
      setShowGoBackModal(true);
    } else {
      navigate("/");
    }
  };

  const smallScreen = useMediaQuery(mediaQueryTablet);

  const showDecisionsGeneral =
    filteredTabs.decisionsGeneral &&
    isSelected === filteredTabs.decisionsGeneral.id;

  const showContributions =
    filteredTabs.contributionsPortfolio &&
    isSelected === filteredTabs.contributionsPortfolio.id;

  const showMinimumIncome =
    filteredTabs.minimumIncomePercentage &&
    isSelected === filteredTabs.minimumIncomePercentage.id;

  const showIncomePort =
    filteredTabs.incomePortfolio &&
    isSelected === filteredTabs.incomePortfolio.id;

  const showScoreModels =
    filteredTabs.scoreModels && isSelected === filteredTabs.scoreModels.id;

  const heightContPageContribut =
    contributionsPortfolio.length === 0 ? "58vh" : "auto";

  const heightContPageMinimum =
    minimumIncomePercentage.length === 0 ? "58vh" : "auto";

  const heightContPageIncome = incomePortfolio.length === 0 ? "58vh" : "auto";
  const heightContPageScoreModels = scoreModels.length === 0 ? "58vh" : "auto";

  return {
    contributionsPortfolio,
    dateDecisions,
    decisionsGeneralRef,
    filteredTabs,
    formValues,
    heightContPageContribut,
    heightContPageIncome,
    heightContPageMinimum,
    heightContPageScoreModels,
    incomePortfolio,
    initialDecisionsGenData,
    isCurrentFormValid,
    isSelected,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    normalizedMinimumIncome,
    saveData,
    scoreModels,
    minimumIncomePercentage,
    showContributions,
    showDateModal,
    showDecisionsGeneral,
    showGoBackModal,
    showIncomePort,
    showInfoModal,
    showMinimumIncome,
    showRequestProcessModal,
    showScoreModels,
    smallScreen,
    handleToggleInfoModal,
    handleOpenModal,
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
    setMinimumIncomePercentage,
    handleReset,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowDateModal,
  };
};

export { useEditGeneralPolicies };
