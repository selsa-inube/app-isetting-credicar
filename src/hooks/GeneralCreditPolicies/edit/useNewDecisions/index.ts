import { useEffect, useMemo, useState } from "react";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewDeletedDecisions } from "@utils/getNewDeletedDecisions";
import { decisionWithoutConditions } from "@utils/decisionWithoutConditions";
import { formatDate } from "@utils/date/formatDate";
import { getDecisionIdMethods } from "@utils/decisions/getDecisionIdMethods";
import { decisionWithMultipleValuesEdit } from "@utils/decisionWithMultipleValuesEdit";
import { getNewInsertDecisions } from "@utils/getNewInsertDecisions";
import { getUpdateDecisionsPolicies } from "@utils/getUpdateDecisionsPolicies";
import { ETransactionOperation } from "@enum/transactionOperation";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { ENameRules } from "@enum/nameRules";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IUseNewDecisions } from "@ptypes/hooks/IUseNewDecisions";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IRuleKey, IRuleState } from "@ptypes/generalCredPolicies/IRuleState";

const useNewDecisions = (props: IUseNewDecisions) => {
  const {
    formValues,
    initialGeneralData,
    decisionData,
    contributionsData,
    minimumIncomeData,
    incomeData,
    methodsData,
    creditBureausConsultReqData,
    scoreModelsData,
    additionalDebtorsData,
    realGuaranteesData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    basicNotificFormatData,
    basicNotificationRecData,
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
    editDecision,
    option,
  } = props;

  const initial: IRuleState = {
    ReciprocityFactorForCreditLimit: (contributionsData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.CONTRIBUTIONS_PORTFOLIO,
    })),
    RiskScoreFactorForCreditLimit: (incomeData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.INCOME_PORTFOLIO,
    })),
    MinimumSubsistenceReservePercentage: (minimumIncomeData ?? []).map(
      (data) => ({
        ...data,
        ruleName: data.ruleName ?? ENameRules.MINIMUM_INCOME_PERCENTAGE,
      }),
    ),
    CreditRiskScoringModel: (scoreModelsData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.SCORE_MODELS,
    })),
    BasicNotificationFormat: (basicNotificFormatData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.BASIC_NOTIFICATION_FORMAT,
    })),
    BasicNotificationRecipient: (basicNotificationRecData ?? []).map(
      (data) => ({
        ...data,
        ruleName: data.ruleName ?? ENameRules.BASIC_NOTIFICATION_RECIPIENT,
      }),
    ),
    MinimumCreditBureauRiskScore: (minCredBureauRiskScoreData ?? []).map(
      (data) => ({
        ...data,
        ruleName: data.ruleName ?? ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE,
      }),
    ),
    NotificationChannel: (notifChannelData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.NOTIFICATION_CHANNEL,
    })),
    RiskScoreApiUrl: (riskScoreApiUrlData ?? []).map((data) => ({
      ...data,
      ruleName: data.ruleName ?? ENameRules.RISKSCORE_API_URL,
    })),
  };

  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
  const [showRequestProcessModal, setShowRequestProcessModal] =
    useState<boolean>(false);
  const [rulesData, setRulesData] = useState<IRuleState>(initial);
  const [newDecisions, setNewDecisions] = useState<IRuleDecisionExtended[]>();
  const [dateDecisions, setDateDecisions] = useState<IDateVerification>();
  const [generalDecisions, setGeneralDecisions] = useState<
    IRuleDecisionExtended[]
  >([]);
  const [showReciprocity, setShowReciprocity] = useState<boolean>(false);
  const [showFactor, setShowFactor] = useState<boolean>(false);

  const dateCurrent = String(formatDate(new Date()));

  useEffect(() => {
    setDateDecisions({
      date: dateCurrent,
    });
  }, []);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeDecisionData = (data: any[]): IRuleState => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        ReciprocityFactorForCreditLimit: [],
        RiskScoreFactorForCreditLimit: [],
        MinimumSubsistenceReservePercentage: [],
        CreditRiskScoringModel: [],
        BasicNotificationFormat: [],
        BasicNotificationRecipient: [],
        MinimumCreditBureauRiskScore: [],
        NotificationChannel: [],
        RiskScoreApiUrl: [],
      };
    }

    const groupedRules: Partial<IRuleState> = {};

    data.forEach((decision) => {
      const ruleName = decision.ruleName;
      const key = ruleNameToKeyMap[ruleName];

      if (!key) {
        console.warn(`No se encontró mapeo para ruleName: ${ruleName}`);
        return;
      }
      const normalizedDecision: IRuleDecisionExtended = {
        decisionId: decision.decisionId || `Decisión ${Math.random()}`,
        ruleName: decision.ruleName,
        labelName: decision.labelName || decision.ruleName,
        ruleDataType: decision.ruleDataType || decision.decisionDataType,
        value: decision.value,
        howToSetTheDecision: decision.howToSetTheDecision,
        effectiveFrom: decision.effectiveFrom,
        typeDecision: decision.typeDecision || "Permanent",
        conditionGroups: Array.isArray(decision.conditionGroups)
          ? decision.conditionGroups
          : [],
        decisionsByRule: Array.isArray(decision.decisionsByRule)
          ? decision.decisionsByRule
          : [],
      };

      if (!groupedRules[key]) {
        groupedRules[key] = [];
      }
      groupedRules[key]!.push(normalizedDecision);
    });

    return {
      ReciprocityFactorForCreditLimit:
        groupedRules.ReciprocityFactorForCreditLimit || [],
      RiskScoreFactorForCreditLimit:
        groupedRules.RiskScoreFactorForCreditLimit || [],
      MinimumSubsistenceReservePercentage:
        groupedRules.MinimumSubsistenceReservePercentage || [],
      CreditRiskScoringModel: groupedRules.CreditRiskScoringModel || [],
      BasicNotificationFormat: groupedRules.BasicNotificationFormat || [],
      BasicNotificationRecipient: groupedRules.BasicNotificationRecipient || [],
      MinimumCreditBureauRiskScore:
        groupedRules.MinimumCreditBureauRiskScore || [],
      NotificationChannel: groupedRules.NotificationChannel || [],
      RiskScoreApiUrl: groupedRules.RiskScoreApiUrl || [],
    };
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

  const valueTransactionOperation = (value: boolean) =>
    value ? ETransactionOperation.INSERT : ETransactionOperation.DELETE;

  const calculationValues = (option
    ? formValues.PaymentCapacityBasedCreditLimit
    : initialGeneralData.PaymentCapacityBasedCreditLimit !==
      formValues.PaymentCapacityBasedCreditLimit) && {
    ...(!option && {
      transactionOperation: valueTransactionOperation(
        formValues.PaymentCapacityBasedCreditLimit,
      ),
    }),
    value: ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY,
  };

  const factorValues = (option
    ? formValues.RiskAnalysisBasedCreditLimit
    : initialGeneralData.RiskAnalysisBasedCreditLimit !==
      formValues.RiskAnalysisBasedCreditLimit) && {
    ...(!option && {
      transactionOperation: valueTransactionOperation(
        formValues.RiskAnalysisBasedCreditLimit ?? false,
      ),
    }),
    value: ERulesOfDecisions.RISK_FACTOR,
  };

  const reciprocityValues = (option
    ? formValues.ReciprocityBasedCreditLimit
    : initialGeneralData.ReciprocityBasedCreditLimit !==
      formValues.ReciprocityBasedCreditLimit) && {
    ...(!option && {
      transactionOperation: valueTransactionOperation(
        formValues.ReciprocityBasedCreditLimit ?? false,
      ),
    }),
    value: ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS,
  };

  const methodsArray = [calculationValues, factorValues, reciprocityValues];

  const additionalDebtors = decisionWithoutConditions(
    ENameRules.ADDITIONAL_DEBTORS,
    formValues.additionalDebtors ?? "",
    initialGeneralData.additionalDebtors,
    option,
    additionalDebtorsData,
  );

  const realGuarantees = decisionWithoutConditions(
    ENameRules.REAL_GUARANTEES,
    formValues.realGuarantees ?? "",
    initialGeneralData.realGuarantees,
    option,
    realGuaranteesData,
  );

  const inquiryValidityPeriod = decisionWithoutConditions(
    ENameRules.INQUIRY_VALIDITY_PERIOD,
    formValues.inquiryValidityPeriod ?? undefined,
    String(initialGeneralData.inquiryValidityPeriod ?? 0),
    option,
    inquiryValidityPeriodData,
  );

  const creditBureausConsult = decisionWithMultipleValuesEdit(
    ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    formValues.creditBureausConsultReq ?? undefined,
    String(initialGeneralData.creditBureausConsultReq ?? ""),
    option,
    creditBureausConsultReqData,
  );

  const lineCreditPayrollAdvance = decisionWithoutConditions(
    ENameRules.LINE_CREDIT_PAYROLL_ADVANCE,
    formValues.lineCreditPayrollAdvance ?? "",
    initialGeneralData.lineCreditPayrollAdvance,
    option,
    lineCreditPayrollAdvanceData,
  );
  const lineCreditPayrollSpecialAdvance = decisionWithoutConditions(
    ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE,
    formValues.lineCreditPayrollSpecialAdvance ?? "",
    initialGeneralData.lineCreditPayrollSpecialAdvance,
    option,
    lineCreditPayrollSpecialAdvanceData,
  );

  const maximumNotifDocSize = decisionWithoutConditions(
    ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE,
    formValues.maximumNotifDocSize ?? undefined,
    String(initialGeneralData.inquiryValidityPeriod ?? 0),
    option,
    maximumNotifDocSizeData,
  );

  const prevRefsMap = {
    ReciprocityFactorForCreditLimit: prevContributionsRef,
    RiskScoreFactorForCreditLimit: prevIncomesRef,
    CreditRiskScoringModel: prevScoreModelsRef,
    MinimumSubsistenceReservePercentage: prevMinimumIncomeRef,
    BasicNotificationFormat: prevBasicNotificFormatRef,
    BasicNotificationRecipient: prevBasicNotificationRecRef,
    MinimumCreditBureauRiskScore: prevMinCredBureauRiskScoreRef,
    NotificationChannel: prevNotifChannelRef,
    RiskScoreApiUrl: prevRiskScoreApiUrlRef,
  };

  const rulesDecisions = useMemo(() => {
    const insertValues: IRules[] = [];
    const deleteValues: IRules[] = [];
    const updateValues: IRules[] = [];

    Object.entries(prevRefsMap).forEach(([key, prevRef]) => {
      const rules = rulesData[key as keyof IRuleState];
      const newInsert = getNewInsertDecisions(
        prevRef,
        rules,
        option,
        dateDecisions?.date,
        key,
      );

      const newUpdate = getUpdateDecisionsPolicies(
        editDecision,
        prevRef,
        rules,
        option,
        dateDecisions?.date,
      );

      const newDelete = getNewDeletedDecisions(
        prevRef,
        rules,
        option,
        dateDecisions?.date,
      );

      if (newInsert) insertValues.push(...(newInsert as IRules[]));
      if (newUpdate) updateValues.push(...(newUpdate as IRules[]));
      if (newDelete) deleteValues.push(...(newDelete as IRules[]));
    });

    return { insertValues, updateValues, deleteValues };
  }, [rulesData, dateDecisions?.date]);

  useEffect(() => {
    let methods;

    if (methodsArray.length > 0) {
      const validMethods = methodsArray.filter(
        (
          method,
        ): method is {
          transactionOperation: ETransactionOperation;
          value: ERulesOfDecisions;
        } => method !== false && method !== undefined && method !== null,
      );

      if (validMethods.length > 0) {
        methods = {
          ruleName: ENameRules.METHODS,
          ...(!option && {
            modifyJustification: `${decisionsLabels.modifyJustification} ${ENameRules.METHODS}`,
          }),
          decisionsByRule: validMethods.map((method) => ({
            decisionId: getDecisionIdMethods(methodsData, method.value),
            effectiveFrom: String(formatDate(new Date())),
            transactionOperation: method.transactionOperation,
            value: method.value,
          })),
        };
      }
    }

    const allGeneralDecisions = [
      methods,
      additionalDebtors,
      realGuarantees,
      creditBureausConsult,
      inquiryValidityPeriod,
      lineCreditPayrollAdvance,
      lineCreditPayrollSpecialAdvance,
      maximumNotifDocSize,
    ];

    const validGeneralDecisions = allGeneralDecisions.filter(
      (decision) => decision !== undefined,
    ) as IRules[];

    setGeneralDecisions(validGeneralDecisions ?? []);
  }, [formValues]);

  const disabledButton = useMemo(() => {
    const { insertValues, updateValues, deleteValues } = rulesDecisions;

    if (option) {
      const hasRulesDataChanged =
        // eslint-disable-next-line @typescript-eslint/array-type
        (Object.keys(initial) as Array<keyof IRuleState>).some((key) => {
          const initialData = JSON.stringify(initial[key] ?? []);
          const currentData = JSON.stringify(rulesData[key] ?? []);
          return initialData !== currentData;
        });

      return hasRulesDataChanged;
    }

    return (
      insertValues.length > 0 ||
      updateValues.length > 0 ||
      deleteValues.length > 0 ||
      generalDecisions.length > 0
    );
  }, [rulesDecisions, generalDecisions, rulesData]);

  useEffect(() => {
    const { insertValues, updateValues, deleteValues } = rulesDecisions;

    setNewDecisions(
      [
        ...insertValues,
        ...updateValues,
        ...deleteValues,
        ...generalDecisions,
      ].flatMap((item) => item as IRules),
    );
  }, [rulesDecisions, generalDecisions]);

  return {
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
    normalizeEvaluateRuleData,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  };
};

export { useNewDecisions };
