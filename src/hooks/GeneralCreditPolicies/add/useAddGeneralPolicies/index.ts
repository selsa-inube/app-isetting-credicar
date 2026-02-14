/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";

import { useRules } from "@hooks/GeneralCreditPolicies/useRules";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { ERequestType } from "@enum/requestType";
import { EGeneral } from "@enum/general";
import { ENameRules } from "@enum/nameRules";
import { mediaQueryTablet } from "@config/environment";
import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";
import { IAddGenCredPoliciesForms } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesForms";
import { IAddGenCredPoliciesRef } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesRef";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IUseAddGenCredPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseAddGenCredPolicies";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IRuleState, IRuleKey } from "@ptypes/generalCredPolicies/IRuleState";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";

const useAddGeneralPolicies = (props: IUseAddGenCredPolicies) => {
  const { appData } = props;
  const initialValues: IAddGenCredPoliciesForms = {
    decisionsGeneral: {
      isValid: false,
      values: {
        additionalDebtors: false,
        realGuarantees: false,
        PaymentCapacityBasedCreditLimit: false,
        ReciprocityBasedCreditLimit: false,
        RiskAnalysisBasedCreditLimit: false,
        DATACREDITO_EXPERIAN: false,
        TRANSUNION: false,
        inquiryValidityPeriod: 0,
        toggleLineCreditPayrollSpecialAdvance: false,
        toggleLineCreditPayrollAdvance: false,
        lineCreditPayrollAdvance: "",
        lineCreditPayrollSpecialAdvance: "",
        maximumNotifDocSize: 0,
      },
    },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [decisionData, setDecisionData] = useState<IRuleDecision[]>([]);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [rulesData, setRulesData] = useState<IRuleState>({
    ReciprocityFactorForCreditLimit: [],
    RiskScoreFactorForCreditLimit: [],
    MinimumSubsistenceReservePercentage: [],
    CreditRiskScoringModel: [],
    BasicNotificationFormat: [],
    BasicNotificationRecipient: [],
    MinimumCreditBureauRiskScore: [],
    NotificationChannel: [],
    RiskScoreApiUrl: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [dateVerification, setDateVerification] = useState<IDateVerification>();
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [disabledButton] = useState(true);
  const [optionsGenDecision, setOptionsGenDecision] =
    useState<IOptionsGenDecision>({} as IOptionsGenDecision);

  const navigate = useNavigate();
  const smallScreen = useMediaQuery(mediaQueryTablet);
  const decisionsGeneralRef = useRef<FormikProps<IDecisionsGeneralEntry>>(null);

  const formReferences: IAddGenCredPoliciesRef = {
    decisionsGeneral: decisionsGeneralRef,
  };

  const ruleNameToKeyMap: Record<string, IRuleKey> = {
    [ENameRules.CONTRIBUTIONS_PORTFOLIO]: "ReciprocityFactorForCreditLimit",
    [ENameRules.INCOME_PORTFOLIO]: "RiskScoreFactorForCreditLimit",
    [ENameRules.MINIMUM_INCOME_PERCENTAGE]:
      "MinimumSubsistenceReservePercentage",
    [ENameRules.SCORE_MODELS]: "CreditRiskScoringModel",
    [ENameRules.BASIC_NOTIFICATION_FORMAT]: "BasicNotificationFormat",
    [ENameRules.BASIC_NOTIFICATION_RECIPIENT]: "BasicNotificationRecipient",
    [ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE]:
      "MinimumCreditBureauRiskScore",
    [ENameRules.NOTIFICATION_CHANNEL]: "NotificationChannel",
    [ENameRules.RISKSCORE_API_URL]: "RiskScoreApiUrl",
  };

  const normalizeDecisionData = (
    data: IRuleDecisionExtended[],
  ): Partial<IRuleState> => {
    if (!Array.isArray(data) || data.length === 0) {
      return {};
    }

    const groupedRules: Partial<IRuleState> = {};

    data.forEach((decision, index) => {
      const ruleName = decision.ruleName;
      const key = ruleNameToKeyMap[ruleName ?? ""];

      if (!key) {
        console.warn(`⚠️ No se encontró mapeo para ruleName: ${ruleName}`);
        return;
      }

      const normalizedDecision: IRuleDecisionExtended = {
        decisionId: `Decisión ${index + 1}`,
        ruleName: decision.ruleName,
        labelName: decision.labelName || decision.ruleName,
        ruleDataType: decision.ruleDataType,
        value: decision.value,
        howToSetTheDecision: decision.howToSetTheDecision,
        effectiveFrom: decision.effectiveFrom,
        typeDecision: decision.typeDecision || "Permanent",
        conditionGroups: Array.isArray(decision.conditionGroups)
          ? decision.conditionGroups
          : [],
        decisionsByRule: Array.isArray((decision as any).decisionsByRule)
          ? (decision as any).decisionsByRule
          : [],
      };

      if (!groupedRules[key]) {
        groupedRules[key] = [];
      }
      groupedRules[key]!.push(normalizedDecision);
    });

    return groupedRules;
  };

  useEffect(() => {
    if (
      decisionData &&
      Array.isArray(decisionData) &&
      decisionData.length > 0
    ) {
      const normalizedRules = normalizeDecisionData(decisionData);

      setRulesData((prev) => {
        const merged: IRuleState = { ...prev };

        (Object.keys(normalizedRules) as IRuleKey[]).forEach((key) => {
          const newValue = normalizedRules[key];
          if (Array.isArray(newValue) && newValue.length > 0) {
            merged[key] = newValue;
          }
        });

        return merged;
      });
    }
  }, [decisionData]);

  const getValues = () =>
    decisionsGeneralRef.current?.values || formValues.decisionsGeneral.values;

  const updateFormValues = () => {
    const values = decisionsGeneralRef.current?.values;
    if (values) {
      setFormValues((prev) => ({
        ...prev,
        decisionsGeneral: {
          ...prev.decisionsGeneral,
          values,
        },
      }));
    }
  };

  const getNextStep = (step: number) => {
    const { PaymentCapacityBasedCreditLimit, ReciprocityBasedCreditLimit } =
      getValues();
    if (step === 2) return PaymentCapacityBasedCreditLimit ? 3 : 4;
    if ([3, 4, 5].includes(step)) return step + 1;
    if ([1].includes(step)) {
      if (ReciprocityBasedCreditLimit) return 2;
      return PaymentCapacityBasedCreditLimit ? 3 : 4;
    }
    return step + 1;
  };

  const getPreviousStep = (step: number) => {
    const { PaymentCapacityBasedCreditLimit, ReciprocityBasedCreditLimit } =
      formValues.decisionsGeneral.values;

    const map: Record<number, number> = {
      2: 1,
      3: ReciprocityBasedCreditLimit ? 2 : 1,
      4: PaymentCapacityBasedCreditLimit
        ? 3
        : ReciprocityBasedCreditLimit
          ? 2
          : 1,
      5: 4,
      6: 5,
    };

    return map[step] || step - 1;
  };

  const handleNextStep = () => {
    if (currentStep >= addGenCredPoliciesSteps.length) return;
    updateFormValues();
    setCurrentStep(getNextStep(currentStep));
  };

  const handlePreviousStep = () => {
    if (currentStep <= 1) return;
    setCurrentStep(getPreviousStep(currentStep));
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormValidChange = (isValid: boolean) =>
    setIsCurrentFormValid(isValid);

  const { rules } = useRules({
    formValues,
    dateVerification: dateVerification ?? ({} as IDateVerification),
    rulesData,
  });

  const handleSubmitClick = () => {
    setSaveData({
      applicationName: EGeneral.APPLICATION_NAME,
      requestType: ERequestType.ADD,
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: "Solicitud de creación de politicas generales de credito",
      entityName: "GeneralCreditPolicies",
      requestDate: formatDate(new Date()),
      useCaseName: EGeneralPolicies.USE_CASE_ADD,
      configurationRequestData: {
        rules: rules,
      },
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  const formValid = isCurrentFormValid;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialValues, formValues) ||
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
  }, [formValues, initialValues, decisionsGeneralRef, canRefresh]);

  const handleOpenModal = () => {
    const compare = compareObjects(initialValues, formValues);
    const compareCompany = compareObjects(
      decisionsGeneralRef.current?.initialValues,
      decisionsGeneralRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate("/");
  };

  return {
    currentStep,
    formValues,
    formReferences,
    smallScreen,
    isCurrentFormValid,
    showModal,
    formValid,
    showRequestProcessModal,
    saveData,
    dateVerification,
    showGoBackModal,
    disabledButton,
    rulesData,
    optionsGenDecision,
    setOptionsGenDecision,
    setDecisionData,
    setRulesData,
    handleOpenModal,
    handleCloseGoBackModal,
    handleGoBack,
    setDateVerification,
    handleSubmitClick,
    handleFormValidChange,
    handleToggleModal,
    handleNextStep,
    handlePreviousStep,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowModal,
    setShowRequestProcessModal,
  };
};

export { useAddGeneralPolicies };
