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
import { ERequestType } from "@enum/requestType";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { EGeneral } from "@enum/general";
import { factor } from "@config/generalCreditPolicies/editGeneralPolicies/factor";
import { editGeneralPoliciesTabsConfig } from "@config/generalCreditPolicies/editGeneralPolicies/tabs";
import { calculation } from "@config/generalCreditPolicies/editGeneralPolicies/calculation";
import { reciprocity } from "@config/generalCreditPolicies/editGeneralPolicies/reciprocity";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/generalCreditPolicies/editGeneralPolicies/editLabels";
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
  } = props;
  const { appData } = useContext(AuthAndPortalData);

  const initialMethodsData = () => {
    if (!methodsData || methodsData.length === 0) {
      return {
        hasReciprocity: false,
        hasCalculation: false,
        hasFactor: false,
      };
    }

    const hasReciprocity = methodsData.some((condition) =>
      reciprocity.includes(condition.value as string),
    );
    const hasCalculation = methodsData.some((condition) =>
      calculation.includes(condition.value as string),
    );
    const hasFactor = methodsData.some((condition) =>
      factor.includes(condition.value as string),
    );

    return { hasReciprocity, hasCalculation, hasFactor };
  };

  const [decisionData, setDecisionData] = useState<IRuleDecision[]>([]);
  const { hasReciprocity, hasCalculation, hasFactor } = initialMethodsData();

  const initialDecisionsGenData = {
    additionalDebtors: hasValuesRule(additionalDebtorsData),
    realGuarantees: hasValuesRule(realGuaranteesData),
    PaymentCapacityBasedCreditLimit: hasCalculation ?? false,
    ReciprocityBasedCreditLimit: hasReciprocity ?? false,
    RiskAnalysisBasedCreditLimit: hasFactor ?? false,
    creditBureausConsultReq: hasValuesRule(creditBureausConsultReqData),
    inquiryValidityPeriod: hasValuesRule(inquiryValidityPeriodData),
    lineCreditPayrollAdvance: hasValuesRule(lineCreditPayrollAdvanceData),
    lineCreditPayrollSpecialAdvance: hasValuesRule(
      lineCreditPayrollSpecialAdvanceData,
    ),
    maximumNotifDocSize: hasValuesRule(maximumNotifDocSizeData),
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

  const normalizedBasicNotificFormat = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(basicNotificFormatData),
  );
  const normalizedBasicNotificationRec = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(basicNotificationRecData),
  );
  const normalizedMinCredBureauRiskScore = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(minCredBureauRiskScoreData),
  );
  const normalizedNotifChannel = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(notifChannelData),
  );
  const normalizedRiskScoreApiUrl = fixDecisionsByRuleArray(
    normalizeEvaluateRuleData(riskScoreApiUrlData),
  );

  const prevContributionsRef = useRef<IRules[]>([]);
  prevContributionsRef.current = normalizedContributions ?? [];

  const prevIncomesRef = useRef<IRules[]>([]);
  prevIncomesRef.current = normalizedIncome ?? [];

  const prevScoreModelsRef = useRef<IRules[]>([]);
  prevScoreModelsRef.current = normalizedScoreModels ?? [];

  const prevMinimumIncomeRef = useRef<IRules[]>([]);
  prevMinimumIncomeRef.current = normalizedMinimumIncome ?? [];

  const prevBasicNotificFormatRef = useRef<IRules[]>([]);
  prevBasicNotificFormatRef.current = normalizedBasicNotificFormat ?? [];

  const prevBasicNotificationRecRef = useRef<IRules[]>([]);
  prevBasicNotificationRecRef.current = normalizedBasicNotificationRec ?? [];

  const prevMinCredBureauRiskScoreRef = useRef<IRules[]>([]);
  prevMinCredBureauRiskScoreRef.current =
    normalizedMinCredBureauRiskScore ?? [];

  const prevNotifChannelRef = useRef<IRules[]>([]);
  prevNotifChannelRef.current = normalizedNotifChannel ?? [];

  const prevRiskScoreApiUrlRef = useRef<IRules[]>([]);
  prevRiskScoreApiUrlRef.current = normalizedRiskScoreApiUrl ?? [];

  const {
    showRequestProcessModal,
    isCurrentFormValid,
    dateDecisions,
    newDecisions,
    showReciprocity,
    showFactor,
    rulesData,
    disabledButton,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  } = useNewDecisions({
    formValues,
    initialGeneralData: initialDecisionsGenData,
    decisionData,
    contributionsData,
    incomeData,
    methodsData,
    scoreModelsData,
    additionalDebtorsData,
    realGuaranteesData,
    minimumIncomeData,
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
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
    prevMinimumIncomeRef,
    prevBasicNotificFormatRef,
    prevBasicNotificationRecRef,
    prevMinCredBureauRiskScoreRef,
    prevNotifChannelRef,
    prevRiskScoreApiUrlRef,
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
      modifyJustification: string;
      rules?: IRuleDecision[];
    } = {
      modifyJustification: `${editLabels.modifyJustification}`,
    };

    if (newDecisions && newDecisions.length > 0) {
      configurationRequestData.rules = newDecisions;
    }

    setSaveData({
      applicationName: EGeneral.APPLICATION_NAME,
      requestType: ERequestType.MODIFY,
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: `${editLabels.modifyJustification}`,
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

  const showBasicNotificFormat =
    filteredTabs.basicNotificationFormat &&
    isSelected === filteredTabs.basicNotificationFormat.id;

  const showBasicNotifRecipient =
    filteredTabs.basicNotificationRecipient &&
    isSelected === filteredTabs.basicNotificationRecipient.id;

  const showMinCreditBureauRiskScore =
    filteredTabs.minimumCreditBureauRiskScore &&
    isSelected === filteredTabs.minimumCreditBureauRiskScore.id;

  const showNotificationChannel =
    filteredTabs.notificationChannel &&
    isSelected === filteredTabs.notificationChannel.id;

  const showRiskScoreApiUrl =
    filteredTabs.riskScoreApiUrl &&
    isSelected === filteredTabs.riskScoreApiUrl.id;

  return {
    dateDecisions,
    decisionsGeneralRef,
    filteredTabs,
    formValues,
    initialDecisionsGenData,
    isCurrentFormValid,
    isSelected,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    normalizedMinimumIncome,
    normalizedRiskScoreApiUrl,
    normalizedNotifChannel,
    normalizedMinCredBureauRiskScore,
    normalizedBasicNotificationRec,
    normalizedBasicNotificFormat,
    saveData,
    showContributions,
    showDateModal,
    showDecisionsGeneral,
    showGoBackModal,
    showIncomePort,
    showInfoModal,
    showMinimumIncome,
    showRequestProcessModal,
    showScoreModels,
    showBasicNotificFormat,
    showBasicNotifRecipient,
    showMinCreditBureauRiskScore,
    showNotificationChannel,
    showRiskScoreApiUrl,
    smallScreen,
    rulesData,
    prevBasicNotificFormatRef,
    prevBasicNotificationRecRef,
    prevMinCredBureauRiskScoreRef,
    prevNotifChannelRef,
    prevRiskScoreApiUrlRef,
    disabledButton,
    setDecisionData,
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
    handleReset,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowDateModal,
  };
};

export { useEditGeneralPolicies };
